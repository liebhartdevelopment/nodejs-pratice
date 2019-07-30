varcount=0;
exportfunctionnext() { return ++count; }
function squared() { return Math.pow(count, 2); }
exportfunctionhello() {
    return"Hello, world!";
}
exportdefaultfunction() { returncount; }
export const meaning = 42;
export let nocount = -1;
export { squared };