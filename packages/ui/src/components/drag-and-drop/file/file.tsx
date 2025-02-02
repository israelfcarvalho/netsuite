"use client"

import React, { ChangeEventHandler, DragEventHandler, useMemo, useRef, useState } from "react";
import { DropZoneBase } from "../base";
import { Button } from "../../button";
import { Trash2 } from "lucide-react";

export const DropZoneFile: React.FC = () => {
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [files, setFiles] = useState<Map<string, File>>(new Map())
    
    const filesArray = useMemo(() => Array.from(files.values()), [files])

    const addFiles = (fileList: FileList | null) => {
        if(fileList){
            for (const file of fileList) {
                setFiles(files => {
                    files.set(file.name, file)
    
                    return new Map(files)
                })
            }
        }
    }

    const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
        addFiles(event.dataTransfer.files)
    }

    const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {}

    const handleSelectFile: ChangeEventHandler<HTMLInputElement> = (event) => {
        addFiles(event.target.files)
    }

    const deleteFile = (file: File) => {
        setFiles(files => {
            files.delete(file.name)

            return new Map(files)
        })
    }

    const deleteAllFiles = () => {
        setFiles(new Map())
    }

    return (
        <DropZoneBase
            className={`min-h-36 w-fit p-4 data-[state=dragging-over]:bg-light-brand-40 hover:bg-light-brand-40 grid grid-cols-[minmax(300px,auto)_1fr] gap-4 items-center border-dotted border-[3px] border-light-neutral-70`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="grid gap-y-2 justify-center">
                <p>Drop your files here or...</p>
                <Button onClick={() => inputFileRef.current?.click()}>Select file(s)</Button>
                {!!filesArray.length && (
                    <Button variant="outline" onClick={deleteAllFiles}>Delete all file(s)</Button>
                )}
                <input ref={inputFileRef} className="hidden" aria-label="select file" type="file" multiple onChange={handleSelectFile}/>
            </div>
            <ul className="h-full grid grid-flow-col auto-cols-max grid-rows-5 gap-y-1 gap-x-10 overflow-auto w-full text-light-neutral-100">
                {filesArray.map(file => (
                    <li className="flex gap-2 items-center justify-between" key={file.name}>
                        {file.name}
                        <Button className="p-0 h-fit" variant="ghost" onClick={() => deleteFile(file)}>
                            <Trash2 className="size-4"/>
                        </Button>
                    </li>
                ))}
            </ul>
        </DropZoneBase>
    )
}