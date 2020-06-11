import { APIs, Module, Context} from '@playpuppy/puppyjs';
import { Engine, Runner, Render, Mouse, MouseConstraint, World, Body, Bodies } from 'matter-js'

const DefinedAPIs: APIs = [
  ['rect', '(number,number,number,number)->Body', '$$rect', ''],
]

class Play {
  element: HTMLElement
  engine: Engine
  world: Matter.World
  render: Render
  runner: Runner

  constructor(element: HTMLElement) {
    this.element = element
    const engine = this.engine = Engine.create();
    const world: Matter.World = this.world = engine.world;
    // create renderer
    const render = this.render = Render.create({
      element: this.element,
      engine: engine,
      options: {
        width: 800,
        height: 600,
      }
    } as any);
    const runner = this.runner = Runner.create()
    // add mouse control
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint :any = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    } as any);
    //World.addConstraint(world, mouseConstraint);
    // keep the mouse in sync with rendering
    (render as any).mouse = mouse
  }

  public start() {
    Render.run(this.render)
    Runner.run(this.runner, this.engine)
  }

  public stop() {
    // this.element.removeChild(this.render.canvas)
    Render.stop(this.render)
    Runner.stop(this.runner)
      // Runner.stop(this.context['$__runner__'])
      // this.context['$__runner__'] = null
      // this.context['$__engine__'].clear()
      // this.context['$__engine__'] = null
      // this.context['$__render__'].stop()
      // this.context['$__render__'].clear()
      // this.context['$__render__'] = null
      // this.context = undefined;
  }

  public pause() {
    Render.stop(this.render)
    Runner.stop(this.runner)
  }

  public resume() {
    Render.stop(this.render)
    Runner.stop(this.runner)
  }
}

export class LibMatterJS extends Module {
  element: HTMLElement | null
  play: Play | undefined

  public constructor(element: HTMLElement | null) {
    super('matterjs', DefinedAPIs)
    this.element = element
  }

  __init__(cx: Context) {
    if(this.element) {
      this.play = new Play(this.element)
      cx.addPlayable(this.play)
    }
  }

  rect(x: number, y: number, width: number, height: number, options?: any) {
    if(this.play) {
      const body = Bodies.rectangle(x, y, width, height, options)
      World.addBody(this.play.world, body)
      return body;
    }
  }

}