import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const CaptionPage = () => {
   const location = useLocation();
   const imageUrl = location.state?.imageUrl;
   const canvasRef = useRef(null);
   const [canvas, setCanvas] = useState(null);
   const [caption, setCaption] = useState("");

   useEffect(() => {
      let fabricInstance;

      const loadFabric = async () => {
         const fabricModule = await import("fabric");
         fabricInstance = fabricModule.fabric; // Get the fabric object

         if (imageUrl) {
            const fabricCanvas = new fabricInstance.Canvas(canvasRef.current, {
               width: 600,
               height: 400,
            });
            setCanvas(fabricCanvas);

            fabricInstance.Image.fromURL(imageUrl, (img) => {
               img.scaleToWidth(600);
               fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
            });

            return () => fabricCanvas.dispose();
         }
      };

      loadFabric();
   }, [imageUrl]);

   const addCaption = () => {
      if (canvas && caption) {
         const text = new fabric.IText(caption, {
            left: 100,
            top: 350,
            fontSize: 20,
            fill: "black",
            selectable: true,
         });
         canvas.add(text);
      }
   };

   const downloadImage = () => {
      const dataURL = canvas.toDataURL({ format: "png" });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "edited-image.png";
      link.click();
   };

   return (
      <div className="caption-container">
         <h2>Add Caption Page</h2>
         <div className="canvas-container">
            <canvas ref={canvasRef} />
         </div>
         <div className="caption-controls">
            <input
               type="text"
               placeholder="Enter caption"
               value={caption}
               onChange={(e) => setCaption(e.target.value)}
            />
            <button onClick={addCaption}>Add</button>
         </div>
         <button className="download-btn" onClick={downloadImage}>Download</button>
      </div>
   );
};

export default CaptionPage;
