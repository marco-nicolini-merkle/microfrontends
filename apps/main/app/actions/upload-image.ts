'use server'

import {writeFile} from 'fs/promises'
import {join} from 'path'

export async function uploadImage(formData: FormData): Promise<{ success: boolean; path: string | null; error: string | null }> {
    const file = formData.get('image') as File
    if (!file) {
        return {success: false, error: 'No file uploaded', path: null}
    }

    try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join(process.cwd(), 'public', 'images', file.name)
        await writeFile(path, buffer)

        return {success: true, path: `/images/${file.name}`, error: null}
    } catch (error) {
        return {success: false, error: 'Failed to upload image', path: null}
    }
}

