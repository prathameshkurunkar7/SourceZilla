import React from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon';

export const ImageIcon = ({ extname }) => {
    <FileIcon extension={extname} foldColor="black" labelColor="black" gradientColor="gray" typ="image" {...defaultStyles.image} />
}
export const DocxIcon = ({ extname }) =>
    <FileIcon extension={extname} type="document" {...defaultStyles.docx} />
export const PdfIcon = ({ extname }) =>
    <FileIcon extension={extname} type="acrobat" {...defaultStyles.pdf} />

export const AudioIcon = () =>
    <FileIcon type="audio" {...defaultStyles.audio} />

export const VideoIcon = () =>
    <FileIcon type="video" {...defaultStyles.video} />

export const CodeIcon = () =>
    <FileIcon extension="cpp" type="acrobat" {...defaultStyles.code} />