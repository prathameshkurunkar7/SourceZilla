import React, { useState } from 'react'
import { ImageIcon, VideoIcon, DocxIcon, CodeIcon, PdfIcon } from './../Components/FileIcons'
import { Box, Grid } from '@material-ui/core'
import ModalImage from "react-modal-image";

const ImageTypes = ['png', 'jpg', 'jpeg', 'PNG', 'JPEG', 'JPEG']
const DocumentTypes = ['docx', 'DOCX']
const ApplicationTypes = ['pdf', 'PDF']

function Files({ file }) {
    const [selected, setSelected] = useState(false)
    return (
        <Grid md={3} sm={2} item lg={3}>
            <Box component="a" target="__blank" href={process.env.NODE_ENV === 'development' ? `http://localhost:4000/experience/file/${file.fileName}` : `/experience/file/${file.fileName}`}>
                {DocumentTypes.includes(file.fileName.split('.')[1]) && (
                    <DocxIcon extname={file.fileName.split('.')[1]} />
                )}
            </Box>

            <Box component="a" target="__blank" href={process.env.NODE_ENV === 'development' ? `http://localhost:4000/experience/file/${file.fileName}` : `/experience/file/${file.fileName}`}>
                {ApplicationTypes.includes(file.fileName.split('.')[1]) && (
                    <PdfIcon extname={file.fileName.split('.')[1]} />
                )}
            </Box>

            {ImageTypes.includes(file.fileName.split('.')[1]) && (
                <Box style={{ display: 'flex', flex: 1 }}>
                    <ModalImage
                        small={`/experience/file/${file.fileName}`}
                        medium={`/experience/file/${file.fileName}`}
                        showRotate
                        imageBackgroundColor="transparent"
                        alt=""
                    />
                </Box>
            )}
        </Grid>
    )
}

export default Files


{/* <Box style={{ cursor: 'pointer' }} onClick={() => setSelected(state => !state)}>
                <ImageIcon extname={file.fileName.split('.')[1]} />
            </Box>
            {selected && (
                <ModalImage
                    smallSrcSet={`/experience/file/${file.fileName}`}
                    medium={`/experience/file/${file.fileName}`}
                    showRotate
                    imageBackgroundColor="transparent"
                    alt=""
                />
            )} */}