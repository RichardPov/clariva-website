import { NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'

const MAX_BYTES = 5 * 1024 * 1024 // 5 MB

// Client-side upload handler: the browser uploads the file directly to Vercel
// Blob (bypassing the ~4.5MB serverless body limit). This route only mints a
// scoped upload token and validates type/size.
export async function POST(req: Request): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // No-op: applicant metadata is persisted via /api/cv/submit after the
        // upload resolves on the client. (This callback only fires in prod.)
      },
    })

    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    )
  }
}
