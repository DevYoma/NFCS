export function nofity(message: string){
    console.log(message);
}

  // NFCS TEAMS
export const teams = [
    {
        label: "Bethany",
        value: "bethany",
    },
    {
        label: "Capernaum", 
        value: "capernaum",
    },
    {
        label: "Galilee",
        value: "galilee"
    },
    {
        label: "Jericho",
        value: "jericho"
    },
    {
        label: "Jordan",
        value: "jordan"
    },
    {
        label: "Nile",
        value: "nile"
    },
]

// DEPARTMENTS
export const departments = [
  {
    label: "Music", 
    value: "music"
  },
  {
    label: "Electrical Electronics Engineering",
    value: "electrical electronics engineering"
  },
  {
    label: "Medicine and Surgery",
    value: "medicine and surgery"
  },
  {
    label: "Mechanical Engineering",
    value: "mechanical engineering"
  },
  {
    label: "Law", 
    value: "law"
  },
  {
    label: "Computer Science",
    value: "computer science"
  }
]

// DATE ORDINALS
export function ordinal(n: number) {
  var s = ["th", "st", "nd", "rd"];
  var v = n%100;
  const dateOrdinal = n + (s[(v-20)%10] || s[v] || s[0]);
  return dateOrdinal
};

// console.log(ordinal(21))