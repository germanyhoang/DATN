import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { useAppSelector } from '../../app/hook';
import { useGetUserByEmailQuery } from '../../service/auth';
import { useSearchParams } from 'react-router-dom';
import { useGetCvByPostIdAndEmailQuery } from '../../service/manage_cv';
import "./CvDemo.css"

const CvDemo = () => {
    const { email } = useAppSelector((res: any) => res.auth)
    const { data: user } = useGetUserByEmailQuery(email)
    const [params] = useSearchParams()
    const postId = params.get('id');
    const mail = params.get('email');
    const [file, setFile] = useState<File>();

    const { data: cvPdf } = useGetCvByPostIdAndEmailQuery({ postId: postId, email: mail });

    const pdfRef: any = useRef()
    const [numPages, setNumPages] = useState<any>();

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();

    const onDocumentLoadSuccess = ({ numPages }: any) => {
        setNumPages(numPages);
    }

    const downloadPDF = () => {
        fetch(`http://localhost:4000/files/${cvPdf.cvs.cv}`).then((response) => {
            response.blob().then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = "my-cv.pdf";
                alink.click();
            });
        });
    }

    useEffect(() => {
        (async () => {
            const arrayBuffer = await (await fetch(`http://localhost:4000/files/${cvPdf.cvs.cv}`)).blob();
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const file = new File([blob], 'document.pdf', { type: 'application/pdf' });
            setFile(file);
        })();
    }, [cvPdf]);
    return (
        <>
            {/* {file && ( */}
            <section className='cv-preview' style={{
                backgroundImage: 'url("https://www.topcv.vn/v4/image/cv_builder/background/bg_3.png")'
            }}>

                <section className="cv-preview__header">
                    <h1 className="cv-preview__title">
                        Xem CV Online của {user?.name}
                    </h1>
                    <button className='cv-preview__btn' onClick={downloadPDF}>
                        <i className="fa-solid fa-download"></i>
                        <span>Tải CV PDF</span>
                    </button>
                </section>

                <div
                    ref={pdfRef}
                >
                    {file && <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}

                    >
                        {
                            Array.from(
                                new Array(numPages),
                                (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={800}
                                        height={600}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        className={(index + 1) > 1 ? 'py-[36px] mb-[24px]' : 'mb-[24px]'}
                                    />
                                )
                            )
                        }
                    </Document>}
                </div>
            </section>
            {/* )}  */}
        </>
    )
}

export default CvDemo