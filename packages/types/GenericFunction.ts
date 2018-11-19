/**
type GenericFunction0<R> = (() => R)
type GenericFunction1<R, G1>   = ((a1: G1) => R)

type GenericFunction2<R, G1, G2>   =
     ((a1: G1, a2: G2) => R)
   // | ((a1?: G1) => R)

   // | ((a1: G1, a2: G2) => R)
   //
    //| ((a1?: G1, a2?: G2) => R)

  /*  | ((a1: G1, a2: G2, a3: G3) => R)
    | ((a1: G1, a2: G2, a3?: G3) => R)
    | ((a1: G1, a2?: G2, a3?: G3) => R)
    | ((a1?: G1, a2?: G2, a3?: G3) => R)

    | ((a1: G1, a2: G2, a3: G3, a4: G4) => R)
    | ((a1: G1, a2: G2, a3: G3, a4?: G4) => R)
    | ((a1: G1, a2: G2, a3?: G3, a4?: G4) => R)
    | ((a1: G1, a2?: G2, a3?: G3, a4?: G4) => R)
    | ((a1?: G1, a2?: G2, a3?: G3, a4?: G4) => R)

    | ((a1: G1,   a2: G2,   a3: G3,     a4: G4,     a5: G5) => R)
    | ((a1: G1,   a2: G2,   a3: G3,     a4: G4,     a5?: G5) => R)
    | ((a1: G1,   a2: G2,   a3: G3,     a4?: G4,    a5?: G5) => R)
    | ((a1: G1,   a2: G2,   a3?: G3,    a4?: G4,    a5?: G5) => R)
    | ((a1: G1,   a2?: G2,  a3?: G3,    a4?: G4,    a5?: G5) => R)
    | ((a1?: G1,  a2?: G2,  a3?: G3,    a4?: G4,    a5?: G5) => R)

    | ((a1: G1,   a2: G2,   a3: G3,     a4: G4,     a5: G5,     a6: G6) => R)
    | ((a1: G1,   a2: G2,   a3: G3,     a4: G4,     a5: G5,     a6?: G6) => R)
    | ((a1: G1,   a2: G2,   a3: G3,     a4: G4,     a5?: G5,    a6?: G6) => R)
    | ((a1: G1,   a2: G2,   a3: G3,     a4?: G4,    a5?: G5,    a6?: G6) => R)
    | ((a1: G1,   a2: G2,   a3?: G3,    a4?: G4,    a5?: G5,    a6?: G6) => R)
    | ((a1: G1,   a2?: G2,  a3?: G3,    a4?: G4,    a5?: G5,    a6?: G6) => R)
    | ((a1?: G1,  a2?: G2,  a3?: G3,    a4?: G4,    a5?: G5,    a6?: G6) => R)

export default GenericFunction*
