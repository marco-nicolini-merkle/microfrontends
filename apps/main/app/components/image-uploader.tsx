'use client'

import * as React from 'react'
import {useFormStatus} from 'react-dom'
import {uploadImage} from '../actions/upload-image'

function SubmitButton({fileSelected}: { fileSelected: boolean }) {
    const {pending} = useFormStatus()
    return (
        <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            disabled={pending || !fileSelected}
        >
            {pending ? 'Uploading...' : 'Upload Image'}
        </button>
    )
}

export default function ImageUploader() {
    const [preview, setPreview] = React.useState<string | null>(null)
    const [state, setState] = React.useState({
        success: false,
        path: null,
        error: null,
        uploadedImageUrl: null,
        ocrResult: null
    })
    const [isPending, startTransition] = React.useTransition()
    const [fileSelected, setFileSelected] = React.useState(false)
    const formRef = React.useRef<HTMLFormElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
            setFileSelected(true)
        } else {
            setPreview(null)
            setFileSelected(false)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(async () => {
            const result = await uploadImage(formData)
            setState({
                ...result,
                uploadedImageUrl: result.success ? result.path : null,
                ocrResult: result.ocrResult
            })
            if (result.success) {
                setPreview(null)
                setFileSelected(false)
                formRef.current?.reset()
            }
        })
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Image Uploader</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="flex flex-col items-center justify-center p-5">
                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input
                            id="image-upload"
                            type="file"
                            name="image"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                {preview && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                        <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg"/>
                    </div>
                )}
                {state.uploadedImageUrl && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Uploaded Image:</h3>
                        <img src={state.uploadedImageUrl} alt="Uploaded" className="max-w-full h-auto rounded-lg"/>
                    </div>
                )}
                <SubmitButton fileSelected={fileSelected}/>
            </form>
            {state.error && (
                <p className="mt-4 text-sm text-red-600">{state.error}</p>
            )}
            {state.success && (
                <p className="mt-4 text-sm text-green-600">Image uploaded successfully!</p>
            )}
            {state.ocrResult && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">OCR Result:</h3>
                    <p><strong>Driver&apos;s License:</strong> {state.ocrResult.driverLicense}</p>
                    <p><strong>Full Name:</strong> {state.ocrResult.fullName}</p>
                </div>
            )}
        </div>
    )
}

