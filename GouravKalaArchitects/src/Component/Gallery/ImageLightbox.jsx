import { useEffect, useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

function ImageLightbox({
    images,
    currentIndex,
    setCurrentIndex,
    onClose,
}) {

    const [canPan, setCanPan] = useState(false);
    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    useEffect(() => {

        const handleKeyDown = (e) => {

            switch (e.key) {

                case "Escape":
                    onClose();
                    break;

                case "ArrowRight":
                    nextImage();
                    break;

                case "ArrowLeft":
                    prevImage();
                    break;

                default:
                    break;

            }

        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };

    }, []);



    return (
        <AnimatePresence>
            <motion.div
                className="lightbox-overlay"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Close */}
                <button
                    className="lightbox-close"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    <FaTimes />
                </button>

                {/* Previous */}
                <button
                    className="lightbox-prev"
                    onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                    }}
                >
                    <FaChevronLeft />
                </button>

                {/* Center Image */}
                <div
                    className="lightbox-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <TransformWrapper
                        key={currentIndex}
                        initialScale={1}
                        minScale={1}
                        maxScale={5}
                        centerOnInit
                        centerZoomedOut
                        limitToBounds={true}
                        wheel={{
                            step: 0.2,
                        }}
                        doubleClick={{
                            mode: "zoomIn",
                        }}
                        pinch={{
                            step: 5,
                        }}
                        panning={{
                            disabled: false,
                        }}
                    >
                        {({ resetTransform }) => (
                            <TransformComponent>
                                <motion.img
                                    key={currentIndex}
                                    src={images[currentIndex].src}
                                    alt=""
                                    className="lightbox-image"
                                    draggable={false}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </TransformComponent>
                        )}
                    </TransformWrapper>
                </div>

                {/* Next */}
                <button
                    className="lightbox-next"
                    onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                    }}
                >
                    <FaChevronRight />
                </button>

                {/* Counter */}
                <div className="lightbox-counter">
                    {currentIndex + 1} / {images.length}
                </div>
            </motion.div>
        </AnimatePresence>
    );

}

export default ImageLightbox;



// import { useEffect, useState } from "react";
// import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     TransformWrapper,
//     TransformComponent,
// } from "react-zoom-pan-pinch";

// function ImageLightbox({
//     images,
//     currentIndex,
//     setCurrentIndex,
//     onClose,
// }) {

//     const nextImage = () => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//     };


//     const prevImage = () => {
//         setCurrentIndex((prev) =>
//             prev === 0 ? images.length - 1 : prev - 1
//         );
//     };

//     useEffect(() => {

//         const handleKeyDown = (e) => {

//             if (e.key === "Escape") {
//                 onClose();
//             }

//             if (e.key === "ArrowRight") {
//                 nextImage();
//             }

//             if (e.key === "ArrowLeft") {
//                 prevImage();
//             }
//         };

//         document.addEventListener("keydown", handleKeyDown);

//         document.body.style.overflow = "hidden";

//         return () => {
//             document.removeEventListener("keydown", handleKeyDown);
//             document.body.style.overflow = "auto";
//         };

//     }, [currentIndex]);

//     return (

//         <AnimatePresence>

//             <motion.div
//                 className="lightbox-overlay"
//                 onClick={onClose}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//             >

//                 {/* Close */}

//                 <button
//                     className="lightbox-close"
//                     onClick={onClose}
//                 >
//                     <FaTimes />
//                 </button>

//                 {/* Previous */}

//                 <button
//                     className="lightbox-prev"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         prevImage();
//                     }}
//                 >
//                     <FaChevronLeft />
//                 </button>

//                 {/* Image */}
//                 <TransformWrapper
//                     initialScale={1}
//                     minScale={1}
//                     maxScale={5}
//                     wheel={{ step: 0.2 }}
//                     doubleClick={{ mode: "zoomIn" }}
//                     centerOnInit
//                 >
//                     <TransformComponent>
//                         <motion.img
//                             key={currentIndex}
//                             src={images[currentIndex].src}
//                             alt=""
//                             className="lightbox-image"
//                             onClick={(e) => e.stopPropagation()}
//                             initial={{
//                                 opacity: 0,
//                                 scale: 0.95,
//                             }}
//                             animate={{
//                                 opacity: 1,
//                                 scale: 1,
//                             }}
//                             exit={{
//                                 opacity: 0,
//                                 scale: 0.95,
//                             }}
//                             transition={{
//                                 duration: 0.3,
//                             }}
//                         />
//                     </TransformComponent>
//                 </TransformWrapper>

//                 {/* Next */}

//                 <button
//                     className="lightbox-next"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         nextImage();
//                     }}
//                 >
//                     <FaChevronRight />
//                 </button>

//                 {/* Counter */}

//                 <div className="lightbox-counter">

//                     {currentIndex + 1} / {images.length}

//                 </div>

//             </motion.div>

//         </AnimatePresence>

//     );
// }

// export default ImageLightbox;