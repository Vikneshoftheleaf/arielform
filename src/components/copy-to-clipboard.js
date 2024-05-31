"use client"
import { useState } from 'react';
import { Copy, CopyCheck, CopySlash, CopyXIcon} from 'lucide-react';

const CopyToClipboard = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 5000); // Reset after 2 seconds
        }).catch(err => {
            console.error('Failed to copy!', err);
        });
    };

    return (
        <div>
            <button className='p-2 border-2 w-full flex relative overflow-hidden rounded-[8px] ' onClick={handleCopy}>
                <span className='text-sm font-light'>{text}</span>
                <span className='bg-white p-2 absolute h-full top-0 right-0 flex items-center'> {copied ? <CopyCheck size={16} className='text-emerald-600'/> : <Copy size={16}/>}
                </span>
            </button>
        </div>
    );
};

export default CopyToClipboard;
