interface DownloadBytesParams {
	bytes: Uint8Array;
	fileName: string;
	type: string;
}

function downloadBytes({ bytes, fileName, type }: DownloadBytesParams) {
	const buffer = new ArrayBuffer(bytes.byteLength);

	new Uint8Array(buffer).set(bytes);

	const url = URL.createObjectURL(new Blob([buffer], { type }));
	const link = document.createElement("a");

	link.href = url;
	link.download = fileName;

	link.click();

	URL.revokeObjectURL(url);
}

function stripExtension(fileName: string) {
	return fileName.replace(/\.[^.]*$/u, "");
}

export { downloadBytes, stripExtension };
