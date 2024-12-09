'use server'

import {writeFile} from 'fs/promises'
import {join} from 'path'
import {headers} from 'next/headers'

export async function uploadImage(formData: FormData): Promise<{ success: boolean; path: string | null; error: string | null; ocrResult?: any }> {
    const file = formData.get('image') as File
    if (!file) {
        return {success: false, error: 'No file uploaded', path: null}
    }

    const headersList = headers()
    const host = headersList.get('host')
    const proto = 'http' //process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const BASE_URL = `${proto}://${host}`

    try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join(process.cwd(), 'public', 'images', file.name)
        await writeFile(path, buffer)

        // Send the buffer to the API route
        const apiResponse = await fetch(`${BASE_URL}/api/api4aiocr`, {
            method: 'POST',
            body: buffer,
        })

        if (!apiResponse.ok) {
            throw new Error('API request failed')
        }

        const ocrResult = await apiResponse.json()

        return {
            success: true,
            path: `/images/${file.name}`,
            error: null,
            ocrResult
        }
    } catch (error) {
        console.error('Error in uploadImage:', error)
        return {success: false, error: 'Failed to upload image or process OCR', path: null}
    }
}

