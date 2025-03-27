import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css";
import "../index.css";

const CaptionPage = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const imageUrl = location.state?.imageUrl;
   const canvasRef = useRef(null);
   const [canvas, setCanvas] = useState(null);
   const [caption, setCaption] = useState("");

   useEffect(() => {
      if (!imageUrl) {
         navigate('/');
         return;
      }

      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
         width: window.innerWidth > 768 ? 600 : 300,
         height: window.innerWidth > 768 ? 400 : 200,
      });

      setCanvas(fabricCanvas);

      const imgElement = new Image();
      imgElement.crossOrigin = "anonymous";
      imgElement.src = imageUrl;

      imgElement.onload = function () {
         console.log("Image loaded successfully", imgElement);

         const fabricImg = new fabric.Image(imgElement, {
            scaleX: fabricCanvas.width / imgElement.width,
            scaleY: fabricCanvas.height / imgElement.height,
         });

         fabricCanvas.set({
            backgroundImage: fabricImg
         });

         fabricCanvas.renderAll();
      };

      imgElement.onerror = function (err) {
         console.error("Image failed to load", err);
      };

      return () => fabricCanvas.dispose();
   }, [imageUrl, navigate]);

   const addCaption = () => {
      if (canvas && caption) {
         const text = new fabric.IText(caption, {
            left: 100,
            top: 100,
            fontSize: 24,
            fill: "black",
            fontFamily: "Arial",
            selectable: true,
            hasControls: true,
            borderColor: "red",
            cornerColor: "blue",
            cornerSize: 10,
            transparentCorners: false,
         });

         canvas.add(text);
         canvas.bringToFront(text);
         canvas.setActiveObject(text);
         canvas.renderAll();
      }
   };

   const addShape = (shapeType) => {
      if (!canvas) return;

      let shape;

      switch (shapeType) {
         case "rectangle":
            shape = new fabric.Rect({
               left: 100,
               top: 100,
               width: 150,
               height: 100,
               fill: "rgba(0, 0, 255, 0.5)",
               stroke: "black",
               strokeWidth: 2,
               selectable: true,
               hasControls: true,
               cornerColor: "blue",
               cornerSize: 10,
               transparentCorners: false,
            });
            break;

         case "circle":
            shape = new fabric.Circle({
               left: 150,
               top: 150,
               radius: 50,
               fill: "rgba(255, 0, 0, 0.5)",
               stroke: "black",
               strokeWidth: 2,
               selectable: true,
               hasControls: true,
               cornerColor: "blue",
               cornerSize: 10,
               transparentCorners: false,
            });
            break;

         case "triangle":
            shape = new fabric.Triangle({
               left: 200,
               top: 200,
               width: 100,
               height: 100,
               fill: "rgba(0, 255, 0, 0.5)",
               stroke: "black",
               strokeWidth: 2,
               selectable: true,
               hasControls: true,
               cornerColor: "blue",
               cornerSize: 10,
               transparentCorners: false,
            });
            break;

         case "polygon":
            shape = new fabric.Polygon(
               [
                  { x: 100, y: 50 },
                  { x: 150, y: 100 },
                  { x: 100, y: 150 },
                  { x: 50, y: 100 },
               ],
               {
                  left: 200,
                  top: 200,
                  fill: "rgba(255, 165, 0, 0.5)",
                  stroke: "black",
                  strokeWidth: 2,
                  selectable: true,
                  hasControls: true,
                  cornerColor: "blue",
                  cornerSize: 10,
                  transparentCorners: false,
               }
            );
            break;

         default:
            return;
      }

      canvas.add(shape);
      shape.moveTo(0);
      canvas.setActiveObject(shape);
      canvas.renderAll();
   };


   const downloadImage = () => {
      if (!canvas) return;
      const dataURL = canvas.toDataURL({ format: "png" });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "edited-image.png";
      link.click();
   };

   return (
      <div className="caption-container">
         <div className="canvas-section">
            <h2>Add Caption & Shapes</h2>
            <div className="canvas-container">
               <canvas ref={canvasRef} />
            </div>
         </div>
         <div className="caption-controls">
            <button className="caption-btn" onClick={addCaption}>Add Text</button> <br/>
            <input className="input-btn" type="text" placeholder="Enter caption" value={caption}
               onChange={(e) => setCaption(e.target.value)} />
            <div>
               <button onClick={() => addShape("rectangle")}>Rectangle</button>
               <button onClick={() => addShape("circle")}>Circle</button>
               <button onClick={() => addShape("triangle")}>Triangle</button>
               <button onClick={() => addShape("polygon")}>Polygon</button>
            </div>
            <button className="download-btn" onClick={downloadImage}>Download</button>
         </div>
      </div>
   );
};

export default CaptionPage;