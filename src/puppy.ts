import { PuppyCanvas as PuppyPlayer} from '@playpuppy/puppyjs';
import { LibMatterJS } from './matterjs';

const sampleCode = `
rect(100,100,100,100)
rect(400,500,800,100, isStatic=True)
`

const puppy = new PuppyPlayer()
puppy.install(new LibMatterJS(document.getElementById('canvas')),'')

document.getElementById('run')!.onclick = () => {
  const source = (document.getElementById("source") as HTMLTextAreaElement)!.value;
  puppy.load(source)
  puppy.start()
}
