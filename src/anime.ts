//const Matter = require('matter-js');
import { Engine, Runner, Vector, MouseConstraint,Events, Composite,World } from 'matter-js'
import { Context } from '@playpuppy/puppyjs';

const clamp =  (value: number, min: number, max: number) => {
  if (value < min)
    return min;
  if (value > max)
    return max;
  return value;
};

const drawStroke = (part: any, c: CanvasRenderingContext2D) => {
  // if (part.wireframes) {
  //   c.lineWidth = 1;
  //   c.strokeStyle = '#bbb';
  //   c.stroke();
  // }
  // else {
    if (part.lineWidth) {
      c.lineWidth = part.lineWidth;
      c.strokeStyle = part.strokeStyle;
      c.stroke();
    }
    c.fillStyle = part.fillStyle || 'green';
    c.fill();
  //}
  // console.log(`stroke ${part.position.x} ${part.position.y}`)
  // c.fillStyle='red';
  // c.fillRect(part.position.x, part.position.y, 10, 10);
}

const drawCircle = (part: any, c: CanvasRenderingContext2D) => {
  c.beginPath();
  c.arc(part.position.x, part.position.y, part.circleRadius, 0, 2 * Math.PI);
  drawStroke(part, c)
}

const drawPolygon = (part: any, c: CanvasRenderingContext2D) => {
  c.beginPath();
  c.moveTo(part.vertices[0].x, part.vertices[0].y);
  for (var j = 1; j < part.vertices.length; j++) {
    if (!part.vertices[j - 1].isInternal /* || showInternalEdges */) {
      c.lineTo(part.vertices[j].x, part.vertices[j].y);
    } else {
      c.moveTo(part.vertices[j].x, part.vertices[j].y);
    }

    if (part.vertices[j].isInternal /* && !showInternalEdges*/) {
      c.moveTo(part.vertices[(j + 1) % part.vertices.length].x, part.vertices[(j + 1) % part.vertices.length].y);
    }
  }
  c.lineTo(part.vertices[0].x, part.vertices[0].y);
  drawStroke(part, c)
}

const textureCache: {[key:string] :HTMLImageElement} = {};

const _getTexture = (imagePath: string) => {
  const image = textureCache[imagePath];
  if (image !== undefined) {
    return image;
  }
  const image2 = textureCache[imagePath] = new Image();
  image2.addEventListener("error", (event: ErrorEvent) => {
    console.log(`no image`);
    image2.src = 'https://hakuhin.jp/graphic/title.png';
  });
  image2.src = imagePath;
  return image;
}

const drawTexture = (part: any, c: CanvasRenderingContext2D) => {
  const texture = _getTexture(part.texture);
  c.translate(part.position.x, part.position.y);
  // if (this.scale.y < 0) {
  //   c.rotate(Math.PI + part.angle);
  //   //c.scale(-1, 1);
  // }
  // else {
    c.rotate(part.angle);
  // }
  try {
    c.drawImage(
      texture,
      part.width * -part.xOffset * part.xScale,
      part.height * -part.yOffset * part.yScale,
      part.width * part.xScale,
      part.height * part.yScale
    );
  }
  catch (e) {

  }
  // revert translation, hopefully faster than save / restore
  // if (this.scale.y < 0) {
  //   c.rotate(-Math.PI - part.angle);
  //   //c.scale(1, 1);
  // }
  // else {
  c.rotate(part.angle);
  // }
  c.translate(-part.position.x, -part.position.y);
}

const drawBody = (body: any, c: CanvasRenderingContext2D) => {
  if(body.parts && body.parts.length > 1) {
    for (var k = 1; k < body.parts.length; k++) {
      var part = body.parts[k];
      if(part.texture) {
        drawTexture(part, c);
      }
      else if (part.circleRadius) {
        drawCircle(part, c);
      }
      else {
        drawPolygon(part, c);
      }
    }
  }
  else {
    if (body.texture) {
      drawTexture(body, c);
    }
    else if (body.circleRadius) {
      drawCircle(body, c);
    }
    else {
      drawPolygon(body, c);
    }
  }
}

const drawText = (body: any, c: CanvasRenderingContext2D) => {
  if (body.textRef !== undefined) {
    const text: string = body.textRef(body);
    const cx = body.position.x;
    const cy = body.position.y;
    c.save();
    c.globalAlpha = 1;
    c.font = body.font || "36px Arial";
    c.fillStyle = body.fontColor || 'gray';
    c.translate(cx, cy);
    // if (this.scale.y < 0) {
    //   c.rotate(Math.PI);
    //   c.scale(-1, 1);
    // }
    if (body.caption) {
      const width = body.width;
      const height = body.height;
      if (height > 79) {
        c.textAlign = 'center';
        //c.fillStyle = '#666666';
        c.fillText(body.caption, 0, -20, width * 0.45);
        //c.fillStyle = ticker.fontColor || defaultFontColor;
        c.textAlign = 'center';
        c.fillText(text, 0, +20, width * 0.90);
      }
      else {
        c.textAlign = 'left';
        c.fillText(body.caption, - width / 2, 0, width * 0.45);
        c.textAlign = 'right';
        c.fillText(text, width / 2, 0, width * 0.50);
      }
    }
    else {
      const width = body.width || 100;
      c.textAlign = body.textAlign || 'center';
      // c.fillStyle = '#000000';
      // c.fillText(text, -2, -2, width);
      c.fillText(text, 0, 0, width * 0.95);
    }
    //c.rotate(-Math.PI);
    //c.translate(-cx, -cy);
    c.restore();
  }
}

const drawConstraint = (constraint: any, c: CanvasRenderingContext2D) => {
  const bodyA = constraint.bodyA;
  const bodyB = constraint.bodyB;
  const start = (bodyA) ? Vector.add(bodyA.position, constraint.pointA) : constraint.pointA;

  if (constraint.renderType === 'pin') {
    c.beginPath();
    c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
    c.closePath();
  } else {
    const end = (bodyB) ? Vector.add(bodyB.position, constraint.pointB) : constraint.pointB;

    c.beginPath();
    c.moveTo(start.x, start.y);

    if (constraint.renderType === 'spring') {
      var delta = Vector.sub(end, start),
        normal = Vector.perp(Vector.normalise(delta)),
        coils = Math.ceil(clamp(constraint.length / 5, 12, 20)),
        offset;

      for (var j = 1; j < coils; j += 1) {
        offset = j % 2 === 0 ? 1 : -1;

        c.lineTo(
          start.x + delta.x * (j / coils) + normal.x * offset * 4,
          start.y + delta.y * (j / coils) + normal.y * offset * 4
        );
      }
    }

    c.lineTo(end.x, end.y);
    //console.log(`c ${start.x},${start.y} ${end.x},${end.y}`)
  }

  if (constraint.lineWidth) {
    c.lineWidth = constraint.lineWidth;
    c.strokeStyle = 'gray'; //constraint.strokeStyle;
    c.stroke();
  }

  // if (constraint.anchors) {
  //   c.fillStyle = constraint.strokeStyle;
  //   c.beginPath();
  //   c.arc(start.x, start.y, 3, 0, 2 * Math.PI);
  //   c.arc(end.x, end.y, 3, 0, 2 * Math.PI);
  //   c.closePath();
  //   c.fill();
  // }
}

export abstract class Drawable {
  public abstract draw(c2d: CanvasRenderingContext2D): void;
}

export class Body extends Drawable {
  public draw(c2d: CanvasRenderingContext2D) {
    drawBody(this, c2d);
  }
}

export class Animator {
  protected cx: Context;
  protected width:number;
  protected height:number;
  protected element: HTMLElement;
  protected canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;//?

  public constructor(cx: Context, element: HTMLElement, width: number, height: number) {
    this.cx = cx;
    this.element = element;
    this.width = width;
    this.height = height;
    const canvas = this.canvas = document.createElement('canvas');  
    canvas.width = width;
    canvas.height = height;
    canvas.oncontextmenu = () => false;
    canvas.onselectstart = () => false;
    element.appendChild(canvas);
    this.context = canvas.getContext('2d')!;
    this.lookAt(0,0, width, height);
    this.initPhysicsEngine();
    this.initEvents();
  }

  public getCanvas() {
    return this.canvas;
  }

  public clear() {
    if (this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
  }

  frameRequestId: any

  public resume() {
    this.enableInputDevices();
    this.canvas.style.filter = '';
    if (window.requestAnimationFrame !== undefined) {
      const loop = (time: number) => {
        this.frameRequestId = window.requestAnimationFrame(loop);
        this.draw();
      };
      loop(1);//
    }
    Runner.run(this.runner, this.engine)
  }

  public pause(message?: string) {
    this.disableInputDevices();
    if (window.cancelAnimationFrame !== undefined) {
      window.cancelAnimationFrame(this.frameRequestId);
      this.canvas.style.filter = 'grayscale(100%)';
    }
    Runner.stop(this.runner)
  }

  public start() {
    this.backs = []
    this.captions = []
    this.resume();
  }

  public stop() {
    this.backs = []
    this.captions = []
    this.pause();
    this.clear();
  }

  /* viewport */
  minX: number = 0
  minY: number = 0
  maxX: number = 0
  maxY: number = 0

  scaleX = 0
  scaleY = 0
  offsetX = 0
  offsetY = 0

  bounds_minX: number = 0 // // bounds_min.x
  bounds_minY: number = 0
  bounds_maxX: number = 0
  bounds_maxY: number = 0

  public lookAt(minX: number, minY: number, maxX: number, maxY: number, center = true) {
    // find ratios
    const viewWidth = (maxX - minX);
    const viewHeight = (maxY - minY);
    const canvasHeight = this.canvas.height;
    const canvasWidth = this.canvas.width;
    const canvasRatio = canvasWidth / canvasHeight;
    const viewRatio = Math.abs(viewWidth / viewHeight);
    var scaleX = 1;
    var scaleY = 1;
    // find scale factor
    if (viewRatio > canvasRatio) {
      scaleY *= viewRatio / canvasRatio;
    } else {
      scaleX *= canvasRatio / viewRatio;
    }

    // position and size
    this.bounds_minX = minX;
    this.bounds_maxX = minX + viewWidth * scaleX;
    this.bounds_minY = minY;
    this.bounds_maxY = minY + viewHeight * scaleY;
    //console.log(`${this.bounds_minX} ${this.bounds_minY} ${this.bounds_maxX} ${this.bounds_maxY}`)

    // center
    if (center) {
      this.bounds_minX += viewWidth * 0.5 - (viewWidth * scaleX) * 0.5;
      this.bounds_maxX += viewWidth * 0.5 - (viewWidth * scaleX) * 0.5;
      this.bounds_minY += viewHeight * 0.5 - (viewHeight * scaleY) * 0.5;
      this.bounds_maxY += viewHeight * 0.5 - (viewHeight * scaleY) * 0.5;
    }

    this.scaleX = (this.bounds_maxX - this.bounds_minX) / this.canvas.width;
    this.scaleY = (this.bounds_maxY - this.bounds_minY) / this.canvas.height;
    this.offsetX = this.bounds_minX;
    this.offsetY = this.bounds_minY;
    // if (this.scaleY < 0) {
    //   this.bounds = new Bounds(this.bounds_minX, this.bounds_maxY, this.bounds_maxX, this.bounds_minY);
    // }
    // update mouse
    // if (this.mouse) {
    //   //console.log(`BOUND ${this.bounds_minX} ${this.bounds_minY} ${this.bounds_maxX} ${this.bounds_maxY}`)
    //   this.mouse.setScale(this.scale);
    //   this.mouse.setOffset(this.offset);
    // }
    [this.minX, this.minY, this.maxX, this.maxY] = [minX, minY, maxX, maxY];
  }

  public resize(width: number, height: number) {
    const canvas = this.canvas;
    canvas.width = width;
    canvas.height = height;
    this.lookAt(this.minX, this.minY, this.maxX, this.maxY, true);
  }

  public measureWidth(text: string, font?: string) {
    if (font) {
      const defaultFont = this.context.font;
      this.context.font = font;
      const m = this.context.measureText(text);
      this.context.font = defaultFont;
      return m.width;
    }
    else {
      const m = this.context.measureText(text);
      return m.width;
    }
  }

  //

  protected draw() {
    const c2d = this.context;
    // background
    c2d.globalCompositeOperation = 'source-in';
    c2d.fillStyle = "transparent";
    c2d.fillRect(0, 0, this.canvas.width, this.canvas.height);
    c2d.globalCompositeOperation = 'source-over';
    // startViewTransform
    // c2d.save();
    // c2d.translate(this.canvas.width / 2, this.canvas.height / 2);
    // c2d.save();
    // c2d.scale(1.0 / this.scaleX, 1/*pixelRation*/ / this.scaleY);
    this.drawBackLayer();
    this.drawPhysicsLayer();
    // endViewTransform
    // c2d.restore();
    // this.drawCaptionLayer();
    // c2d.restore();
  }

  backs: Drawable[] = []
  protected drawBackLayer() {
    const c2d = this.context;
    for(const obj of this.backs) {
      obj.draw(c2d)
    }
  }

  captions: Drawable[] = []
  protected drawCaptionLayer() {
    const c2d = this.context;
    for (const obj of this.captions) {
      obj.draw(c2d)
    }
  }

  // physics layer 
  engine: any
  world: any
  runner: any
  mouseConstraint: any
  activeMouse: any

  protected initPhysicsEngine() {
    const engine = this.engine = Engine.create();
    this.runner = Runner.create()
    this.world = engine.world;
    const mouseConstraint = this.mouseConstraint = MouseConstraint.create(engine, {
      mouse: { 
        button: -1,
        position: { x: 0, y: 0 }, 
        sourceEvents: {} as any, 
        wheelDelta: 0 
      },
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    } as any);
    World.addConstraint(this.world, mouseConstraint.constraint);
    //Events.on(mouseConstraint, 'startdrag', (e)=> {console.log(e);})
    Events.on(mouseConstraint, 'startdrag', (e) => { 
      const body = e.body;
      if(body.clicked) {
        const position = e.mouse.position;
        body.clicked(body, position.x | 0, position.y | 0, e.mouse.button);
      }
    });
    Events.on(this.engine, 'collisionActive', event => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i += 1) {
        const pair = pairs[i];
        if (pair.bodyA['overlap']) {
          pair.bodyA['overlap'](pair.bodyA, pair.bodyB);
        }
        if (pair.bodyB['overlap']) {
          pair.bodyB['overlap'](pair.bodyB, pair.bodyA);
        }
      }
    });
    Events.on(this.engine, 'collisionStart', event => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i += 1) {
        const pair = pairs[i];
        if (pair.bodyA['moveIn']) {
          pair.bodyA['moveIn'](pair.bodyA, pair.bodyB);
        }
        if (pair.bodyB['moveIn']) {
          pair.bodyB['moveIn'](pair.bodyB, pair.bodyA);
        }
      }
    });
    Events.on(this.engine, 'collisionEnd', event => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i += 1) {
        const pair = pairs[i];
        if (pair.bodyA['moveOut']) {
          pair.bodyA['moveOut'](pair.bodyA, pair.bodyB);
        }
        if (pair.bodyB['moveOut']) {
          pair.bodyB['moveOut'](pair.bodyB, pair.bodyA);
        }
      }
    });
  }

  protected drawPhysicsLayer() {
    const c2d = this.context;
    const bodies = Composite.allBodies(this.world);
    for (var i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      drawBody(body, c2d);
    }
    const constraints = Composite.allConstraints(this.world);
    for (var i = 0; i < constraints.length; i++) {
      const constraint : any = constraints[i];
      if (!constraint.visible || !constraint.pointA || !constraint.pointB)
        continue;
      drawConstraint(constraint, c2d);
    }
  }

  // Event Controls 

  private keyDown: any = null;
  private keyUp: any = null;

  private mouseMove: any = null;
  private mouseDown: any = null;
  private mouseUp: any = null;
  private mouseWheel: any = null;

  private initEvents() {
    var startTime = 0;
    var prevKey = '';
    this.keyDown = (event: KeyboardEvent) => {
      var keyName = event.key;
      if (prevKey !== keyName) {
        prevKey = keyName;
        startTime = this.engine.timing.timestamp;
      }
      this.world.isStillActive = true;
      this.cx.ffiCall('keyDown', keyName, 0);
    }

    this.keyUp = (event: KeyboardEvent) => {
      var keyName = event.key;
      const endTime = this.engine.timing.timestamp;
      this.world.isStillActive = true;
      this.cx.ffiCall('keyUp', keyName, Math.max(0, endTime - startTime) | 0);
      prevKey = '';
    }

    const pixelRatio = 1;
    const absolute = {x: 0, y: 0};
    const mouse = this.mouseConstraint.mouse;
    this.mouseMove = (event: any) => {
      getMousePosition(event, this.canvas, pixelRatio, absolute);
      const touches = event.changedTouches;
      if (touches) {
        mouse.button = 0;
        event.preventDefault();
      }
      mouse.position.x = absolute.x * this.scaleX + this.offsetX;
      mouse.position.y = absolute.y * this.scaleY + this.offsetY;
      // mouse.sourceEvents.mousemove = event;
      // this.world.isStillActive = true;
      this.cx.vars['mouseX'] = mouse.position.x | 0
      this.cx.vars['mouseY'] = mouse.position.y | 0
      this.cx.ffiCall('mouseMove', this.cx.vars['mouseX'], this.cx.vars['mouseY'], mouse.button);
    };

    this.mouseDown = (event: any) => {
      getMousePosition(event, this.canvas, pixelRatio, absolute);
      const touches = event.changedTouches;
      if (touches) {
        mouse.button = 0;
        event.preventDefault();
      } else {
        mouse.button = event.button;
      }
      mouse.position.x = absolute.x * this.scaleX + this.offsetX;
      mouse.position.y = absolute.y * this.scaleY + this.offsetY;
      // mouse.mousedownPosition.x = mouse.position.x;
      // mouse.mousedownPosition.y = mouse.position.y;
      // mouse.sourceEvents.mousedown = event;
      // this.world.isStillActive = true;
      this.cx.ffiCall('mouseDown', mouse.position.x | 0, mouse.position.y | 0, mouse.button);
    };

    this.mouseUp = (event: any) => {
      getMousePosition(event, this.canvas, pixelRatio, absolute);
      const touches = event.changedTouches;
      if (touches) {
        event.preventDefault();
      }
      mouse.button = -1;
      mouse.position.x = absolute.x * this.scaleX + this.offsetX;
      mouse.position.y = absolute.y * this.scaleY + this.offsetY;
      // mouse.mouseupPosition.x = mouse.position.x;
      // mouse.mouseupPosition.y = mouse.position.y;
      // mouse.sourceEvents.mouseup = event;
      // this.world.isStillActive = true;
      this.cx.ffiCall('mouseUp', mouse.position.x | 0, mouse.position.y | 0, mouse.button);
    }

    this.mouseWheel = (event: any) => {
      mouse.wheelDelta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
      //event.preventDefault();
      this.world.isStillActive = true;
    };

    // var updateGravity = function (event) {
    //   var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
    //     gravity = engine.world.gravity;

    //   if (orientation === 0) {
    //     gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
    //     gravity.y = Common.clamp(event.beta, -90, 90) / 90;
    //   } else if (orientation === 180) {
    //     gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
    //     gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
    //   } else if (orientation === 90) {
    //     gravity.x = Common.clamp(event.beta, -90, 90) / 90;
    //     gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
    //   } else if (orientation === -90) {
    //     gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
    //     gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
    //   }
    // };
    // window.addEventListener('deviceorientation', updateGravity);
  }

  private enableInputDevices() {
    if (this.keyDown != null) {
      const element = this.canvas;
      // document.addEventListener('keydown', this.keyDown);
      // document.addEventListener('keyup', this.keyUp);
      element.addEventListener('mousemove', this.mouseMove);
      element.addEventListener('mousedown', this.mouseDown);
      element.addEventListener('mouseup', this.mouseUp);

      //element.addEventListener('mousewheel', this.mouseWheel);
      // element.addEventListener('DOMMouseScroll', this.mouseWheel);

      element.addEventListener('touchmove', this.mouseMove);
      element.addEventListener('touchstart', this.mouseDown);
      element.addEventListener('touchend', this.mouseUp);
    }
  }

  private disableInputDevices() {
    if (this.keyDown !== null) {
      const element = this.canvas;
      document.removeEventListener('keydown', this.keyDown);
      document.removeEventListener('keyup', this.keyUp);
      element.removeEventListener('mousemove', this.mouseMove);
      element.removeEventListener('mousedown', this.mouseDown);
      element.removeEventListener('mouseup', this.mouseUp);

      // element.removeEventListener('mousewheel', this.mouseWheel);
      // element.addEventListener('DOMMouseScroll', this.mouseWheel);

      element.removeEventListener('touchmove', this.mouseMove);
      element.removeEventListener('touchstart', this.mouseDown);
      element.removeEventListener('touchend', this.mouseUp);
    }
  }
} 


const getMousePosition = (event: any, element: HTMLElement, pixelRatio: number, position: any) => {
  const elementBounds = element.getBoundingClientRect();
  const rootNode = (document.documentElement || document.body.parentNode || document.body);
  const scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : rootNode.scrollLeft;
  const scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : rootNode.scrollTop;
  const touches = event.changedTouches;
  var x, y;

  if (touches) {
    x = touches[0].pageX - elementBounds.left - scrollX;
    y = touches[0].pageY - elementBounds.top - scrollY;
  } else {
    x = event.pageX - elementBounds.left - scrollX;
    y = event.pageY - elementBounds.top - scrollY;
  }
  position.x =
    x / (element.clientWidth / ((element as any)['width'] || element.clientWidth) * pixelRatio);
  position.y =
    y / (element.clientHeight / ((element as any)['height'] || element.clientHeight) * pixelRatio);
  return position;
}
