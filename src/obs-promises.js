const { Observable } = require("rxjs");

//promesa
//se ejcuta una sola vez y me ejecuta un valor unico
const doSomething = () => {
  return new Promise((resolver) => {
    resolver("valor uno");
  });
};

//observador
//el observable retorna varios valores
const doSomething$ = () => {
  return new Observable((observer) => {
    observer.next("valor $ dos");
    observer.next("valor $ tres");
    observer.next("valor $ cuatro");
  });
};

(async () => {
  const rta = await doSomething();
  console.log(rta);
})(() => {
  const obs$ = doSomething$();
  obs$.subscribe((rta) => {
    console.log(rta);
  });
})();
