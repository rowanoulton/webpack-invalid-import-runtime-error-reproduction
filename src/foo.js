// doesn't compile:
// import  {dsfksdfksdjfkj} from './dsfksdjfkdsj';

// compiles:
import  { doesntExist } from './bar';

// fails, but only at runtime
doesntExist();
