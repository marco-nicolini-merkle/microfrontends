import {NextRequest, NextResponse} from 'next/server';
import * as path from 'path';

import {promises as fs} from 'fs';

const API_URL = 'https://demo.api4ai.cloud/ocr/v1/results?algo=simple-words';
const ID_MARK = '4d.DLN';
const FAMILY_MARK = '1.FAMILY';
const NAME_MARK = '2.GIVEN';
const ADDRESS_MARK = '8.ADDRESS';

interface WordInfo {
    box: number[];
    text: string;
}

function findTextBelow(words: WordInfo[], wordInfo: WordInfo): WordInfo {
    const [x, y] = wordInfo.box;
    let candidate = words[0];
    let candidateDist = Infinity;

    for (const elem of words) {
        if (elem.text === wordInfo.text) continue;

        const [currBoxX, currBoxY] = elem.box;
        const currVertDist = currBoxY - y;
        const currHorizDist = x - currBoxX;

        if (currVertDist > 0) {  // we are only looking for items below
            const dist = Math.hypot(currVertDist, currHorizDist);
            if (dist < candidateDist) {
                candidateDist = dist;
                candidate = elem;
            }
        }
    }

    return candidate;
}

export async function GET(request: NextRequest) {
    try {
        const imagePath = path.join(process.cwd(), 'public', 'images', 'sample-dl-dc.jpeg');
        const imageBuffer = await fs.readFile(imagePath);

        const formData = new FormData();
        formData.append('image', new Blob([imageBuffer]), 'sample-dl-dc.jpeg');

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const jsonObj = await response.json();
        const words: WordInfo[] = jsonObj.results[0].entities[0].objects.map((elem: any) => ({
            box: elem.box,
            text: elem.entities[0].text,
        }));

        let idMarkInfo: WordInfo | undefined;
        let famMarkInfo: WordInfo | undefined;
        let nameMarkInfo: WordInfo | undefined;

        for (const elem of words) {
            if (elem.text === ID_MARK) idMarkInfo = elem;
            else if (elem.text === FAMILY_MARK) famMarkInfo = elem;
            else if (elem.text === NAME_MARK) nameMarkInfo = elem;
        }

        if (!idMarkInfo || !famMarkInfo || !nameMarkInfo) {
            throw new Error('Required markers not found in the image');
        }

        const license = findTextBelow(words, idMarkInfo).text;
        const familyName = findTextBelow(words, famMarkInfo).text;
        const name1Info = findTextBelow(words, nameMarkInfo);
        const name1 = name1Info.text;
        const name2Info = findTextBelow(words, name1Info);

        let fullName: string;
        if (name2Info.text === ADDRESS_MARK) {  // no second name
            fullName = `${name1} ${familyName}`;
        } else {  // with second name
            fullName = `${name1} ${name2Info.text} ${familyName}`;
        }

        return NextResponse.json({
            driverLicense: license,
            fullName: fullName,
        });
    } catch (error) {
        console.error('Error processing OCR request:', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}

