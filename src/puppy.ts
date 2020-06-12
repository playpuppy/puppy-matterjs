import { PuppyPlayer} from '@playpuppy/puppyjs';
import { LibMatterJS } from './matterjs';

const puppy = new PuppyPlayer()
puppy.install(new LibMatterJS(document.getElementById('canvas')!,800,600),'')

puppy.addEventListener('error', (x)=>{
  console.log(x);
})

document.getElementById('run')!.onclick = () => {
  const source = (document.getElementById("source") as HTMLTextAreaElement)!.value;
  console.log(puppy.load(source));
  puppy.start();
}

