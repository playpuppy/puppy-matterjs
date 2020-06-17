import { APIs, Module, Context} from '@playpuppy/puppyjs';
import { Animator } from './anime';
import { World, Body, Bodies } from 'matter-js'
import { chooseColorScheme, choose} from './color';

const DefinedAPIs: APIs = [
  ['rect', '(number,number,number,number)->Body', '$$rect', ''],
]

export class LibMatterJS extends Module {
  width: number
  height: number
  element: HTMLElement | null
  player: Animator | undefined
  colorScheme: string[]

  public constructor(element: HTMLElement, width: number, height: number) {
    super('matterjs', DefinedAPIs)
    this.element = element;
    this.width = width;
    this.height = height;
    this.colorScheme = chooseColorScheme('pop')
  }

  __init__(cx: Context) {
    if(this.element) {
      this.player = new Animator(cx, this.element, this.width, this.height);
      cx.addPlayer(this.player)
    }
  }

  rect(x: number, y: number, width: number, height: number, options : any = {}) {
    if(this.player) {
      if(!options.fillStyle) {
        options.fillStyle = choose(this.colorScheme);
      }
      const body = Bodies.rectangle(x, y, width, height, options)
      World.addBody(this.player.world, body)
      return body;
    }
  }

  circle(x: number, y: number, radius: number, options: any = {}) {
    if (this.player) {
      if (!options.fillStyle) {
        options.fillStyle = choose(this.colorScheme);
      }
      const body = Bodies.circle(x, y, radius, options)
      World.addBody(this.player.world, body)
      return body;
    }
  }

}