// import { Vector, Bounds } from 'matter-js'
// import { Stopify} from '@playpuppy/origamijs'

// const createCanvas = (element: HTMLElement, width: number, height: number) => {
//   var canvas = document.createElement('canvas');
//   canvas.width = width;
//   canvas.height = height;
//   canvas.oncontextmenu = () => false;
//   canvas.onselectstart = () => false;
//   element.appendChild(canvas);
//   return canvas;
// }

// /**
//  * Gets the pixel ratio of the canvas.
//  * @method _getPixelRatio
//  * @private
//  * @param {HTMLElement} canvas
//  * @return {Number} pixel ratio
//  */

// const _getPixelRatio = (canvas: HTMLCanvasElement) => {
//   const context = canvas.getContext('2d') as any;
//   const devicePixelRatio = window.devicePixelRatio || 1;
//   const backingStorePixelRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio
//     || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio
//     || context.backingStorePixelRatio || 1;
//   return devicePixelRatio / backingStorePixelRatio;
// };

// /**
//  * Gets the requested texture (an Image) via its path
//  * @method _getTexture
//  * @private
//  * @param {render} render
//  * @param {string} imagePath
//  * @return {Image} texture
//  */

// const NoImage = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px">
// <g>
//     <path d="M28.1,36.6c4.6,1.9,12.2,1.6,20.9,1.1c8.9-0.4,19-0.9,28.9,0.9c6.3,1.2,11.9,3.1,16.8,6c-1.5-12.2-7.9-23.7-18.6-31.3   c-4.9-0.2-9.9,0.3-14.8,1.4C47.8,17.9,36.2,25.6,28.1,36.6z"/>
//     <path d="M70.3,9.8C57.5,3.4,42.8,3.6,30.5,9.5c-3,6-8.4,19.6-5.3,24.9c8.6-11.7,20.9-19.8,35.2-23.1C63.7,10.5,67,10,70.3,9.8z"/>
//     <path d="M16.5,51.3c0.6-1.7,1.2-3.4,2-5.1c-3.8-3.4-7.5-7-11-10.8c-2.1,6.1-2.8,12.5-2.3,18.7C9.6,51.1,13.4,50.2,16.5,51.3z"/>
//     <path d="M9,31.6c3.5,3.9,7.2,7.6,11.1,11.1c0.8-1.6,1.7-3.1,2.6-4.6c0.1-0.2,0.3-0.4,0.4-0.6c-2.9-3.3-3.1-9.2-0.6-17.6   c0.8-2.7,1.8-5.3,2.7-7.4c-5.2,3.4-9.8,8-13.3,13.7C10.8,27.9,9.8,29.7,9,31.6z"/>
//     <path d="M15.4,54.7c-2.6-1-6.1,0.7-9.7,3.4c1.2,6.6,3.9,13,8,18.5C13,69.3,13.5,61.8,15.4,54.7z"/>
//     <path d="M39.8,57.6C54.3,66.7,70,73,86.5,76.4c0.6-0.8,1.1-1.6,1.7-2.5c4.8-7.7,7-16.3,6.8-24.8c-13.8-9.3-31.3-8.4-45.8-7.7   c-9.5,0.5-17.8,0.9-23.2-1.7c-0.1,0.1-0.2,0.3-0.3,0.4c-1,1.7-2,3.4-2.9,5.1C28.2,49.7,33.8,53.9,39.8,57.6z"/>
//     <path d="M26.2,88.2c3.3,2,6.7,3.6,10.2,4.7c-3.5-6.2-6.3-12.6-8.8-18.5c-3.1-7.2-5.8-13.5-9-17.2c-1.9,8-2,16.4-0.3,24.7   C20.6,84.2,23.2,86.3,26.2,88.2z"/>
//     <path d="M30.9,73c2.9,6.8,6.1,14.4,10.5,21.2c15.6,3,32-2.3,42.6-14.6C67.7,76,52.2,69.6,37.9,60.7C32,57,26.5,53,21.3,48.6   c-0.6,1.5-1.2,3-1.7,4.6C24.1,57.1,27.3,64.5,30.9,73z"/>
// </g>
// </svg>`

// const textures: any = {

// };

// // const basePath = options.base || 'https://playpuppy.github.io/LIVE2019/image';

// const _getTexture = (imagePath: string, base = '') => {
//   const image = textures[imagePath];
//   if (image !== undefined) {
//     return image;
//   }
//   const image2 = textures[imagePath] = new Image();
//   image2.addEventListener("error", (event: ErrorEvent) => {
//     console.log(`no image`);
//     image2.src = 'https://hakuhin.jp/graphic/title.png';
//   });
//   if (
//     imagePath.startsWith('http://') ||
//     imagePath.startsWith('https://') ||
//     imagePath.startsWith('data:') ||
//     imagePath.startsWith('/')
//   ) {
//     image2.src = imagePath;
//   } else {
//     image2.src = `${base}/${imagePath}`;
//   }
//   return image;
// }

// /**
// * Gets the mouse position relative to an element given a screen pixel ratio.
// * @method _getRelativeMousePosition
// * @private
// * @param {} event
// * @param {} element
// * @param {number} pixelRatio
// * @return {}
// */

// const getMousePosition = (event: any, element: HTMLElement, pixelRatio: number, position: Vector) => {
//   const elementBounds = element.getBoundingClientRect();
//   const rootNode = (document.documentElement || document.body.parentNode || document.body);
//   const scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : rootNode.scrollLeft;
//   const scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : rootNode.scrollTop;
//   const touches = event.changedTouches;
//   var x, y;

//   if (touches) {
//     x = touches[0].pageX - elementBounds.left - scrollX;
//     y = touches[0].pageY - elementBounds.top - scrollY;
//   } else {
//     x = event.pageX - elementBounds.left - scrollX;
//     y = event.pageY - elementBounds.top - scrollY;
//   }
//   position.x =
//     x / (element.clientWidth / ((element as any)['width'] || element.clientWidth) * pixelRatio);
//   position.y =
//     y / (element.clientHeight / ((element as any)['height'] || element.clientHeight) * pixelRatio);
//   return position;
// }

// /**
// * The `Matter.Render` module is a simple HTML5 canvas based renderer for visualising instances of `Matter.Engine`.
// * It is intended for development and debugging purposes, but may also be suitable for simple games.
// * It includes a number of drawing options including wireframe, vector with support for sprites and viewports.
// *
// * @class Render
// */

// const _requestAnimationFrame = window.requestAnimationFrame;
// const _cancelAnimationFrame = window.cancelAnimationFrame;

// export class PuppyRender {
//   public canvas: HTMLCanvasElement
//   canvas2d: CanvasRenderingContext2D
//   width = 1000
//   height = 1000
//   scaleX = 1.0
//   scaleY = 1.0
//   offsetX = 0
//   offsetY = 0
//   bounds: Bounds;
//   viewports: [number, number, number, number] | null = null;
//   frameRequestId = -1;
//   pixelRatio = 1;
//   background: string | undefined = undefined;

//   public constructor(element: HTMLElement) {
//     this.canvas = createCanvas(element, element.clientWidth, element.clientHeight)
//     //this.mouse = engine.setRender(this);
//     //this.mouse = engine.getMouse(this);
//     this.canvas2d = this.canvas.getContext('2d')!
//     // init viewport
//     this.bounds = {
//       min: {x: 0, y: 0}, 
//       max: {x: this.canvas.width, y: this.canvas.height}
//     }
//     // if (this.options.screen) {
//       this.lookAt(0, 0, this.width, this.height);
//     // }
//     // else {
//     //   const hw = this.options.width / 2;
//     //   const hh = this.options.height / 2;
//     //   this.lookAt(-hw, hh, hw, -hh);
//     // }
//     if (this.background) {
//       this.applyBackground(this.background);
//     }
//   }

//   public clear() {
//     if (this.canvas.parentElement) {
//       this.canvas.parentElement.removeChild(this.canvas);
//     }
//   }

//   /**
//  * Positions and sizes the viewport around the given object bounds.
//  * Objects must have at least one of the following properties:
//  * - `object.bounds`
//  * - `object.position`
//  * - `object.min` and `object.max`
//  * - `object.x` and `object.y`
//  * @method lookAt
//  * @param {render} this
//  * @param {object[]} objects
//  * @param {vector} [padding]
//  * @param {bool} [center=true]
//  */

//   public lookAt(minX: number, minY: number, maxX: number, maxY: number, center = true) {
//     // find ratios
//     const viewWidth = (maxX - minX);
//     const viewHeight = (maxY - minY);
//     const canvasHeight = this.canvas.height;
//     const canvasWidth = this.canvas.width;
//     const canvasRatio = canvasWidth / canvasHeight;
//     const viewRatio = Math.abs(viewWidth / viewHeight);
//     var scaleX = 1;
//     var scaleY = 1;
//     // find scale factor
//     if (viewRatio > canvasRatio) {
//       scaleY *= viewRatio / canvasRatio;
//     } else {
//       scaleX *= canvasRatio / viewRatio;
//     }

//     // position and size
//     this.bounds.min.x = minX;
//     this.bounds.max.x = minX + viewWidth * scaleX;
//     this.bounds.min.y = minY;
//     this.bounds.max.y = minY + viewHeight * scaleY;
//     //console.log(`${this.bounds.min.x} ${this.bounds.min.y} ${this.bounds.max.x} ${this.bounds.max.y}`)

//     // center
//     if (center) {
//       this.bounds.min.x += viewWidth * 0.5 - (viewWidth * scaleX) * 0.5;
//       this.bounds.max.x += viewWidth * 0.5 - (viewWidth * scaleX) * 0.5;
//       this.bounds.min.y += viewHeight * 0.5 - (viewHeight * scaleY) * 0.5;
//       this.bounds.max.y += viewHeight * 0.5 - (viewHeight * scaleY) * 0.5;
//     }

//     const mx = (this.bounds.max.x - this.bounds.min.x) / this.canvas.width;
//     const my = (this.bounds.max.y - this.bounds.min.y) / this.canvas.height;
//     this.scaleX = mx;
//     this.scaleY = my;
//     this.offsetX = this.bounds.min.x;
//     this.offsetY = this.bounds.min.y;
//     // if (my < 0) {
//     //   this.bounds = new Bounds(this.bounds.min.x, this.bounds.max.y, this.bounds.max.x, this.bounds.min.y);
//     // }
//     // update mouse
//     if (this.mouse) {
//       //console.log(`BOUND ${this.bounds.min.x} ${this.bounds.min.y} ${this.bounds.max.x} ${this.bounds.max.y}`)
//       this.mouse.setScale(this.scale);
//       this.mouse.setOffset(this.offset);
//     }
//     this.viewports = [minX, minY, maxX, maxY];
//   }

//   public resize(width: number, height: number) {
//     const canvas = this.canvas;
//     canvas.width = width;
//     canvas.height = height;
//     if (this.viewports) {
//       this.lookAt(this.viewports[0], this.viewports[1], this.viewports[2], this.viewports[3], true);
//     }
//   }

//   public measureWidth(text: string, font?: string) {
//     if (font) {
//       const defaultFont = this.canvas2d.font;
//       this.canvas2d.font = font;
//       const m = this.canvas2d.measureText(text);
//       this.canvas2d.font = defaultFont;
//       return m.width;
//     }
//     else {
//       const m = this.canvas2d.measureText(text);
//       return m.width;
//     }
//   }

//   // public isComputerScreen() {
//   //   return this.scale.y > 0;
//   // }

//   // private yscale(y: number) {
//   //   return this.scale.y > 0 ? y : -y;
//   // }

//   // public setViewport(x1: number, y1: number, x2: number, y2: number, center = true) {
//   //   const minX = Math.min(x1, x2);
//   //   const minY = Math.min(y1, y2);
//   //   const maxX = Math.max(x1, x2);
//   //   const maxY = Math.max(y1, y2);
//   //   if (this.isComputerScreen()) {
//   //     this.lookAt(minX, minY, maxX, maxY, center);
//   //   }
//   //   else {
//   //     this.lookAt(minX, maxY, maxX, minY, center);
//   //   }
//   // }

//   // showingMessage: string | null = null;

//   // public show(message: string, time = 1000) {
//   //   this.showingMessage = message;
//   //   if (this.showingMessage !== null) {
//   //     setTimeout(() => { this.showingMessage = null }, time);
//   //   }
//   // }

//   public start(px: any) {
//     this.enableInputDevices(px)
//     this.canvas.style.filter = ''
//     if (_requestAnimationFrame !== undefined) {
//       const loop = (time: number) => {
//         this.frameRequestId = _requestAnimationFrame(loop);
//         this.draw(px);
//       };
//       loop(1);//
//     }
//   }

//   /**
//    * Ends execution of `Render.run` on the given `render`, by canceling the animation frame request event loop.
//    * @method stop
//    * @param {render} render
//    */

//   public stop() {
//     this.disableInputDevices();
//     if (_cancelAnimationFrame !== undefined) {
//       _cancelAnimationFrame(this.frameRequestId);
//     }
//   }

//   private startViewTransform() {
//     this.canvas2d.save();
//     this.canvas2d.translate(this.canvas.width / 2, this.canvas.height / 2);
//     this.canvas2d.scale(this.pixelRatio / this.scaleX, this.pixelRatio / this.scaleY);
//   }

//   private endViewTransform() {
//     this.canvas2d.restore();
//   }

//   /**
//    * Renders the given `engine`'s `Matter.World` object.
//    * This is the entry point for all rendering and should be called every time the scene changes.
//    * @method world
//    * @param {render} this
//    */

//   private draw(px: any) {
//     const canvas = this.canvas
//     const c2d = this.canvas2d
//     const engine = px['$__engine__']
//     const world = px['$__world__']
//     const bodies = world.allBodies()
//     const constraints = world.allConstraints()

//     const bodies0: any[] = px['$__bodies0__']
//     const bodiesZ: any[] = px['$__bodiesZ__']

//     // const timestamp = engine.timing.timestamp;
//     // var event = {
//     //   timestamp: timestamp
//     // }
//     // world.vars['TIMESTAMP'] = timestamp;
//     // world.vars['TIME'] = ((timestamp / 1000) | 0);
//     // world.vars['MOUSE'] = engine.mouse.position;
//     // world.vars['VIEWPORT'] = this.bounds;

//     //Events.trigger(this, 'beforeRender', event);

//     // apply background if it has changed
//     // clear the canvas with a transparent fill, 
//     // to allow the canvas background to show

//     c2d.globalCompositeOperation = 'source-in';
//     c2d.fillStyle = "transparent";
//     c2d.fillRect(0, 0, canvas.width, canvas.height);
//     c2d.globalCompositeOperation = 'source-over';

//     // // filter out bodies that are not in view
//     // for (var i = 0; i < allBodies.length; i++) {
//     //   var body = allBodies[i];
//     //   if (Bounds.overlaps(body.bounds, this.bounds))
//     //     bodies.push(body);
//     // }

//     // // filter out constraints that are not in view
//     // for (var i = 0; i < allConstraints.length; i++) {
//     //   var constraint = allConstraints[i],
//     //     bodyA = constraint.bodyA,
//     //     bodyB = constraint.bodyB,
//     //     pointAWorld = constraint.pointA,
//     //     pointBWorld = constraint.pointB;

//     //   if (bodyA) pointAWorld = Vector.add(bodyA.position, constraint.pointA!);
//     //   if (bodyB) pointBWorld = Vector.add(bodyB.position, constraint.pointB!);

//     //   if (!pointAWorld || !pointBWorld)
//     //     continue;

//     //   if (Bounds.contains(this.bounds, pointAWorld) || Bounds.contains(this.bounds, pointBWorld))
//     //     constraints.push(constraint);
//     // }

//     // transform the view
//     this.startViewTransform();
//       // fully featured rendering of bodies
//     this.drawBodies(bodies0, c2d);
//     this.drawBodies(bodies, c2d);
//     //this.constraints(constraints, c2d);
//     this.endViewTransform();
//     this.drawBodies(bodiesZ, c2d);

//     // this.ticks += 1;
//     // this.world.fficall('__motion__', this.ticks);

//     // if (this.showingMessage !== null) {
//     //   c2d.font = 'bold 80px sans-serif';
//     //   const w = c2d.measureText(this.showingMessage).width;
//     //   const cx = this.canvas.width / 2;
//     //   const cy = this.canvas.height / 2;
//     //   c2d.fillStyle = 'rgba(0,0,0,0.75)';
//     //   c2d.fillRect(cx - w, cy - w, w + w, w + w);
//     //   c2d.fillStyle = 'white';
//     //   c2d.textAlign = 'center';
//     //   c2d.fillText(this.showingMessage, cx, cy + 40);
//     // }

//     //Events.trigger(this, 'afterRender', event);
//     //console.log(world.isModified);
//   }

//   /**
//   * Applies the background to the canvas using CSS.
//   * @method applyBackground
//   * @private
//   * @param {render} render
//   * @param {string} background
//   */

//   public applyBackground(background: string) {
//     var cssBackground = background;
//     if (/(jpg|gif|png)$/.test(background)) {
//       cssBackground = `url(${background})`;
//     }
//     this.canvas.style.background = cssBackground;
//     this.canvas.style.backgroundSize = "contain";
//   }

//   private drawBodies(bodies: any[], c: CanvasRenderingContext2D) {
//     // const c = context;
//     // const options = this.world as any;
//     // //const showInternalEdges = options.showInternalEdges || !options.wireframes;
//     // const wireframes = options.wireframes;
//     // const globalAlpha = options.opacity || 1;

//     for (var i = 0; i < bodies.length; i++) {
//       const body = bodies[i];
//       if (!body.visible || !Bounds.overlaps(body.bounds, this.bounds)) {
//         continue
//       }
//       if (body.draw) {
//         body.draw(c)
//       }

//       // quick anime
//       body.doMotion();
//     }
//   }

//   private drawMatterBody(body: any, c: CanvasRenderingContext2D) {
//     for (var k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
//       const part: any = body.parts[k];
//       if (!part.visible) {
//         continue;
//       }
//       c.globalAlpha = (part.opacity) ? 1.0 * part.opacity : 1.0;
//       if (part.texture) {
//         this.drawTexture(part)
//       } else {
//         this.drawPolygon(part)
//       }
//       c.globalAlpha = 1.0;
//     }
//     if (body.textRef !== undefined) {
//       this.drawText(body);
//     }
//   }

//   private drawTexture(part: any) {
//     const c = this.canvas2d;
//     const texture = _getTexture(part.texture);
//     c.translate(part.position.x, part.position.y);
//     // if (this.scaleY < 0) {
//     //   c.rotate(Math.PI + part.angle);
//     // }
//     // else {
//     c.rotate(part.angle);
//     // }
//     try {
//       c.drawImage(
//         texture,
//         part.width * -part.xOffset * part.xScale,
//         part.height * -part.yOffset * part.yScale,
//         part.width * part.xScale,
//         part.height * part.yScale
//       )
//     }
//     catch (e) {
//     }
//     // revert translation, hopefully faster than save / restore
//     // if (this.scaleY < 0) {
//     //   c.rotate(-Math.PI - part.angle);
//     // }
//     // else {
//     c.rotate(part.angle);
//     // }
//     c.translate(-part.position.x, -part.position.y);
//   }

//   private drawPolygon(part: any) {
//     const c = this.canvas2d;
//     if (part.circleRadius) {
//       c.beginPath();
//       c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
//     } else {
//       c.beginPath();
//       c.moveTo(part.vertices[0].x, part.vertices[0].y);
//       for (var j = 1; j < part.vertices.length; j++) {
//         if (!part.vertices[j - 1].isInternal /* || showInternalEdges */) {
//           c.lineTo(part.vertices[j].x, part.vertices[j].y);
//         } else {
//           c.moveTo(part.vertices[j].x, part.vertices[j].y);
//         }
//         if (part.vertices[j].isInternal /* && !showInternalEdges*/) {
//           c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
//         }
//       }
//       c.lineTo(part.vertices[0].x, part.vertices[0].y);
//       c.closePath();
//     }
//     c.fillStyle = part.fillStyle;
//     if (part.lineWidth) {
//       c.lineWidth = part.lineWidth;
//       c.strokeStyle = part.strokeStyle;
//       c.stroke();
//     }
//     c.fill();
//   }

//   defaultFont = "36px Arial"
//   defaultFontColor = 'gray'

//   private drawText(body: any) {
//     const c = this.canvas2d;
//     const text: string = body.textRef(body);
//     const cx = body.position.x;
//     const cy = body.position.y;
//     c.save();
//     c.globalAlpha = 1;
//     c.font = body.font || this.defaultFont;
//     c.fillStyle = body.fontColor || this.defaultFontColor;
//     c.translate(cx, cy);
//     // if (this.scaleY < 0) {
//     //   c.rotate(Math.PI);
//     //   c.scale(-1, 1);
//     // }
//     if (body.caption) {
//       const width = body.width;
//       const height = body.height;
//       if (height > 79) {
//         c.textAlign = 'center';
//         //c.fillStyle = '#666666';
//         c.fillText(body.caption, 0, -20, width * 0.45);
//         //c.fillStyle = ticker.fontColor || defaultFontColor;
//         c.textAlign = 'center';
//         c.fillText(text, 0, +20, width * 0.90);
//       }
//       else {
//         c.textAlign = 'left';
//         c.fillText(body.caption, - width / 2, 0, width * 0.45);
//         c.textAlign = 'right';
//         c.fillText(text, width / 2, 0, width * 0.50);
//       }
//     }
//     else {
//       const width = body.width || 100;
//       c.textAlign = body.textAlign || 'center';
//       // c.fillStyle = '#000000';
//       // c.fillText(text, -2, -2, width);
//       c.fillText(text, 0, 0, width * 0.95);
//     }
//     //c.rotate(-Math.PI);
//     //c.translate(-cx, -cy);
//     c.restore();
//   }


//   private drawConstraints(constraints: any[], c: CanvasRenderingContext2D) {
//     for (var i = 0; i < constraints.length; i++) {
//       const constraint = constraints[i];

//       if (!constraint.visible || !constraint.pointA || !constraint.pointB)
//         continue;

//       const bodyA = constraint.bodyA;
//       const bodyB = constraint.bodyB;
//       const start = (bodyA) ? Vector.add(bodyA.position, constraint.pointA) : constraint.pointA;


//       if (constraint.renderType === 'pin') {
//         c.beginPath();
//         c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
//         c.closePath();
//       } else {
//         const end = (bodyB) ? Vector.add(bodyB.position, constraint.pointB) : constraint.pointB;

//         c.beginPath();
//         c.moveTo(start.x, start.y);

//         if (constraint.renderType === 'spring') {
//           var delta = Vector.sub(end, start),
//             normal = Vector.perp(Vector.normalise(delta)),
//             coils = Math.ceil(Common.clamp(constraint.length / 5, 12, 20)),
//             offset;

//           for (var j = 1; j < coils; j += 1) {
//             offset = j % 2 === 0 ? 1 : -1;

//             c.lineTo(
//               start.x + delta.x * (j / coils) + normal.x * offset * 4,
//               start.y + delta.y * (j / coils) + normal.y * offset * 4
//             );
//           }
//         }

//         c.lineTo(end.x, end.y);
//         //console.log(`c ${start.x},${start.y} ${end.x},${end.y}`)
//       }

//       if (constraint.lineWidth) {
//         c.lineWidth = constraint.lineWidth;
//         c.strokeStyle = 'gray'; //constraint.strokeStyle;
//         c.stroke();
//       }

//       // if (constraint.anchors) {
//       //   c.fillStyle = constraint.strokeStyle;
//       //   c.beginPath();
//       //   c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
//       //   c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
//       //   c.closePath();
//       //   c.fill();
//       // }
//     }
//   }

//   // Events 

//   private keyDown: any = null;
//   private keyUp: any = null;

//   private mouseMove: any = null;
//   private mouseDown: any = null;
//   private mouseUp: any = null;
//   private mouseWheel: any = null;

//   private initEvents(px: any) {
//     // const mouse = this.mouse;
//     //const engine = px['$__engine__']
//     var startTime = 0;
//     var prevKey = '';

//     this.keyDown = (event: KeyboardEvent) => {
//       const keyName = event.key;
//       if (prevKey !== keyName) {
//         prevKey = keyName;
//         startTime = px[PuppyKey.timestamp] || 0;
//       }
//       if(px) {
//         px[PuppyKey.UserActive] = true
//         fficall(px, PuppyKey.keyDown, keyName, 0)
//       }
//     }

//     this.keyUp = (event: KeyboardEvent) => {
//       const keyName = event.key;
//       const endTime = px[PuppyKey.timestamp] || 0;
//       if (px) {
//         px[PuppyKey.UserActive] = true
//         fficall(px, PuppyKey.keyUp, keyName, Math.max(0, endTime - startTime) | 0)
//       }
//       prevKey = '';
//     }

//     /* mouse */

//     const absolute = {x: 0, y: 0}
//     var mouseButton = 0;
//     const mousePosition = {x: 0, y: 0}

//     this.mouseDown = (event: any) => {
//       getMousePosition(event, this.canvas, this.pixelRatio, absolute);
//       const touches = event.changedTouches;
//       if (touches) {
//         mouseButton = 0;
//         event.preventDefault();
//       } else {
//         mouseButton = event.button;
//       }
//       mousePosition.x = absolute.x * this.scaleX + this.offsetX;
//       mousePosition.y = absolute.y * this.scaleY + this.offsetY;
//       // mouse.mousedownPosition.x = mouse.position.x;
//       // mouse.mousedownPosition.y = mouse.position.y;
//       // mouse.sourceEvents.mousedown = event;
//       px[PuppyKey.UserActive] = true
//       fficall(px, PuppyKey.mouseDown, mousePosition.x | 0, mousePosition.y | 0, mouseButton)
//     }

//     this.mouseMove = (event: any) => {
//       getMousePosition(event, this.canvas, this.pixelRatio, absolute);
//       const touches = event.changedTouches;
//       if (touches) {
//         mouseButton = 0;
//         event.preventDefault();
//       }
//       mousePosition.x = (absolute.x * this.scaleX + this.offsetX) | 0;
//       mousePosition.y = (absolute.y * this.scaleY + this.offsetY) | 0;
//       //mouse.sourceEvents.mousemove = event;
//       px[PuppyKey.UserActive] = true
//       if(px[PuppyKey.mouseMove]) {
//         fficall(px, PuppyKey.mouseMove, mousePosition.x, mousePosition.y, mouseButton)
//       }
//     }

//     this.mouseUp = (event: any) => {
//       getMousePosition(event, this.canvas, this.pixelRatio, absolute);
//       const touches = event.changedTouches;
//       if (touches) {
//         event.preventDefault();
//       }
//       mouseButton = -1;
//       mouse.position.x = mouse.absolute.x * this.scale.x + this.offset.x;
//       mouse.position.y = mouse.absolute.y * this.scale.y + this.offset.y;
//       mouse.mouseupPosition.x = mouse.position.x;
//       mouse.mouseupPosition.y = mouse.position.y;
//       mouse.sourceEvents.mouseup = event;
//       this.engine.world.isStillActive = true;
//       this.engine.world.fficall('__mouseup__', mouse.position.x | 0, mouse.position.y | 0, mouse.button);
//     }

//     this.mouseWheel = (event: any) => {
//       mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
//       //      event.preventDefault();
//     };

//     // var updateGravity = function (event) {
//     //   var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
//     //     gravity = engine.world.gravity;

//     //   if (orientation === 0) {
//     //     gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
//     //     gravity.y = Common.clamp(event.beta, -90, 90) / 90;
//     //   } else if (orientation === 180) {
//     //     gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
//     //     gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
//     //   } else if (orientation === 90) {
//     //     gravity.x = Common.clamp(event.beta, -90, 90) / 90;
//     //     gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
//     //   } else if (orientation === -90) {
//     //     gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
//     //     gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
//     //   }
//     // };
//     // window.addEventListener('deviceorientation', updateGravity);
//   }

//   private enableInputDevices() {
//     if (this.keyDown != null) {
//       document.addEventListener('keydown', this.keyDown);
//       document.addEventListener('keyup', this.keyUp);

//       const element = this.canvas;
//       element.addEventListener('mousemove', this.mouseMove);
//       element.addEventListener('mousedown', this.mouseDown);
//       element.addEventListener('mouseup', this.mouseUp);

//       //element.addEventListener('mousewheel', this.mouseWheel);
//       // element.addEventListener('DOMMouseScroll', this.mouseWheel);

//       element.addEventListener('touchmove', this.mouseMove);
//       element.addEventListener('touchstart', this.mouseDown);
//       element.addEventListener('touchend', this.mouseUp);
//     }
//   }

//   private disableInputDevices() {
//     if (this.keyDown !== null) {
//       document.removeEventListener('keydown', this.keyDown);
//       document.removeEventListener('keyup', this.keyUp);

//       const element = this.canvas;
//       element.removeEventListener('mousemove', this.mouseMove);
//       element.removeEventListener('mousedown', this.mouseDown);
//       element.removeEventListener('mouseup', this.mouseUp);

//       // element.removeEventListener('mousewheel', this.mouseWheel);
//       // element.addEventListener('DOMMouseScroll', this.mouseWheel);

//       element.removeEventListener('touchmove', this.mouseMove);
//       element.removeEventListener('touchstart', this.mouseDown);
//       element.removeEventListener('touchend', this.mouseUp);
//     }
//   }



// }