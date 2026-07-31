import { useEffect, useState, useRef } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionValue } from "framer-motion";

function ImageLightbox({
    images,
    currentIndex,
    setCurrentIndex,
    onClose,
}) {


    const [zoomed, setZoomed] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState({
        x: "50%",
        y: "50%",
    });
    const x = useMotionValue(0);
    const y = useMotionValue(0);


    const containerRef = useRef(null);
    const nextImage = () => {
        setZoomed(false);
        x.set(0);
        y.set(0);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setZoomed(false);
        x.set(0);
        y.set(0);
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
                    if (!zoomed) nextImage();
                    break;

                case "ArrowLeft":
                    if (!zoomed) prevImage();
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
    }, [zoomed, onClose]);



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
                    ref={containerRef}
                    className="lightbox-content"
                    onClick={(e) => e.stopPropagation()}
                    onWheel={(e) => {
                        e.preventDefault();

                        if (zoomed) return;

                        if (e.deltaY > 0) {
                            nextImage();
                        } else {
                            prevImage();
                        }
                    }}
                >
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex].src}
                        alt=""
                        className="lightbox-image"
                        draggable={false}
                        drag={zoomed}
                        dragConstraints={containerRef}
                        dragMomentum={false}
                        dragElastic={0}
                        whileDrag={{
                            cursor: "grabbing",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();

                            if (dragging) return;

                            if (!zoomed) {
                                const rect = e.currentTarget.getBoundingClientRect();

                                const clickX = ((e.clientX - rect.left) / rect.width) * 100;
                                const clickY = ((e.clientY - rect.top) / rect.height) * 100;

                                setZoomOrigin({
                                    x: `${clickX}%`,
                                    y: `${clickY}%`,
                                });

                                setZoomed(true);
                            } else {
                                setZoomed(false);

                                x.set(0);
                                y.set(0);

                                setZoomOrigin({
                                    x: "50%",
                                    y: "50%",
                                });
                            }
                        }}

                        onDragStart={() => {
                            setDragging(true);
                        }}

                        onDragEnd={() => {
                            setTimeout(() => setDragging(false), 0);
                        }}
                        initial={{
                            opacity: 0,
                            scale: 1,
                        }}

                        animate={{
                            opacity: 1,
                            scale: zoomed ? 2.8 : 1,
                        }}

                        exit={{
                            opacity: 0,
                            scale: 1,
                        }}

                        transition={{
                            duration: 0.35,
                            ease: "easeInOut",
                        }}

                        style={{
                            x,
                            y,
                            transformOrigin: `${zoomOrigin.x} ${zoomOrigin.y}`,
                            cursor: zoomed ? "grab" : "zoom-in",
                        }}
                    />
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