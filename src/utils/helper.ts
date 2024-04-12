export function notify(message: string){
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
    "label": "Accounting",
    "value": "accounting"
  },
  {
    "label": "Adult Education and Lifelong Learning",
    "value": "adult education and lifelong learning"
  },
  {
    "label": "Agricultural and Environmental Engineering",
    "value": "agricultural and environmental engineering"
  },
  {
    "label": "Agricultural Economics",
    "value": "agricultural economics"
  },
  {
    "label": "Agricultural Extension and Rural Sociology",
    "value": "agricultural extension and rural sociology"
  },
  {
    "label": "Animal Science",
    "value": "animal science"
  },
  {
    "label": "Applied Geophysics",
    "value": "applied geophysics"
  },
  {
    "label": "Architecture",
    "value": "architecture"
  },
  {
    "label": "Arts and Social Science Education",
    "value": "arts and social science education"
  },
  {
    "label": "Biochemistry",
    "value": "biochemistry"
  },
  {
    "label": "Botany",
    "value": "botany"
  },
  {
    "label": "Building",
    "value": "building"
  },
  {
    "label": "Business Administration",
    "value": "business administration"
  },
  {
    "label": "Chemical Engineering",
    "value": "chemical engineering"
  },
  {
    "label": "Chemistry",
    "value": "chemistry"
  },
  {
    "label": "Civil Engineering",
    "value": "civil engineering"
  },
  {
    "label": "Computer Engineering",
    "value": "computer engineering"
  },
  {
    "label": "Computer Science with Economics",
    "value": "computer science with economics"
  },
  {
    "label": "Computer Science with Mathematics",
    "value": "computer science with mathematics"
  },
  {
    "label": "Crop Production And Protection",
    "value": "crop production and protection"
  },
  {
    "label": "Demography and Social Statistics",
    "value": "demography and social statistics"
  },
  {
    "label": "Dentistry",
    "value": "dentistry"
  },
  {
    "label": "Dramatic Arts",
    "value": "dramatic arts"
  },
  {
    "label": "Economics",
    "value": "economics"
  },
  {
    "label": "Educational Management",
    "value": "educational management"
  },
  {
    "label": "Education and Biology",
    "value": "education and biology"
  },
  {
    "label": "Educational Technology",
    "value": "educational technology"
  },
  {
    "label": "English Language",
    "value": "english language"
  },
  {
    "label": "Entrepreneurship",
    "value": "entrepreneurship"
  },
  {
    "label": "Estate Management",
    "value": "estate management"
  },
  {
    "label": "Electrical and Electronics Engineering",
    "value": "electrical and electronics engineering"
  },
  {
    "label": "Family, Nutrition, and Consumer Sciences",
    "value": "family, nutrition, and consumer sciences"
  },
  {
    "label": "Fine Arts",
    "value": "fine arts"
  },
  {
    "label": "Food Science and Technology",
    "value": "food science and technology"
  },
  {
    "label": "Foreign Languages", 
    "value": "foreign languages"
  },
  {
    "label": "Geography",
    "value": "geography"
  },
  {
    "label": "Geology",
    "value": "geology"
  },
  {
    "label": "Guidance and Counseling",
    "value": "guidance and counseling"
  },
  {
    "label": "Health Education",
    "value": "health education"
  },
  {
    "label": "History and International Studies",
    "value": "history and international studies"
  },
  {
    "label": "Law",
    "value": "law"
  },
  {
    "label": "Library and Information Studies",
    "value": "library and information studies"
  },
  {
    "label": "Linguistics and African Languages",
    "value": "linguistics and african languages"
  },
  {
    "label": "Mathematics",
    "value": "mathematics"
  },
  {
    "label": "Materials Science and Engineering",
    "value": "materials science and engineering"
  },
  {
    "label": "Mechanical Engineering",
    "value": "mechanical engineering"
  },
  {
    "label": "Medical Rehabilitation",
    "value": "medical rehabilitation"
  },
  {
    "label": "Medicine and Surgery",
    "value": "medicine and surgery"
  },
  {
    "label": "Microbiology",
    "value": "microbiology"
  },
  {
    "label": "Music",
    "value": "music"
  },
  {
    "label": "Nursing",
    "value": "nursing"
  },
  {
    "label": "Pharmacy",
    "value": "pharmacy"
  },
  {
    "label": "Philosophy",
    "value": "philosophy"
  },
  {
    "label": "Physical and Health Education",
    "value": "physical and health education"
  },
  {
    "label": "Physics and Engineering Physics",
    "value": "physics and engineering physics"
  },
  {
    "label": "Political Science",
    "value": "political science"
  },
  {
    "label": "Psychology",
    "value": "psychology"
  },
  {
    "label": "Public Administration",
    "value": "public administration"
  },
  {
    "label": "Quantity Surveying",
    "value": "quantity surveying"
  },
  {
    "label": "Religious Studies",
    "value": "religious studies"
  },
  {
    "label": "Science and Technology Education", 
    "value": "science and technology education"
  },
  {
    "label": "Soil Science",
    "value": "soil science"
  },
  {
    "label": "Statistics",
    "value": "statistics"
  },
  {
    "label": "Sociology and Anthropology",
    "value": "sociology and anthropology"
  },
  {
    "label": "Surveying and Geoinformatics",
    "value": "surveying and geoinformatics"
  },
  {
    "label": "Urban and Regional Planning",
    "value": "urban and regional planning"
  },
  {
    "label": "Yoruba",
    "value": "yoruba"
  },
  {
    "label": "Zoology",
    "value": "zoology"
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

// DATE 
export function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const suffix = getDaySuffix(day);
  
  return `${day}${suffix} of ${month}`;
}

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatBirthday(dateString: string){
  const dateObject = new Date(dateString)
  return formatDate(dateObject);
}