import { Response } from '../../src/models/models';
export const responseFormats: Response = {
  basic: {
    title: "How to Type Faster",
    author: "John Smith",
    created: "1/19/2024",
    content: [
      {
        heading: "Introduction",
        paragraph: "Typing faster can greatly improve productivity in today's digital age. By using efficient techniques and practicing consistently, anyone can increase their typing speed and accuracy. This paper will provide useful tips and exercises to help you type faster and more effectively.",
      },
      {
        heading: "Proper Finger Placement",
        paragraph: "One of the key factors in typing faster is to adopt the correct finger placement on the keyboard. Begin by placing your fingers on the home row keys ('ASDF' for the left hand and 'JKL;' for the right hand) with your thumbs resting on the spacebar. Maintaining this position will allow you to reach all other keys easily and reduce unnecessary finger movements, ultimately speeding up your typing.",
      },
      {
        heading: "Touch Typing Technique",
        paragraph: "The touch typing technique involves typing without looking at the keyboard or individual keys. This method enables you to develop muscle memory and increases typing speed. Start by familiarizing yourself with the key layout and practice typing simple sentences without peeking at your hands. Gradually increase the difficulty level and challenge yourself to type accurately without visual guidance.",
      },
      {
        heading: "Practice and Speed Building",
        paragraph: "Regular practice is essential for improving typing speed. Dedicate specific time periods each day to practice typing exercises or engaging with typing software. Additionally, using online typing games and apps can make the learning process more enjoyable. Set realistic goals to gradually increase your speed, focusing not only on velocity but also on accuracy. Speed will naturally improve over time with consistent effort.",
      },
    ],
  },
  jobApp: {
    title: "Job Application for Platform Engineer",
    jobName: "Platform Engineer",
    overview:
      "As a seasoned Software Engineer with a specific focus on Platform Engineering, I bring forth a strong understanding of platform technologies, excellent coding skills and the ability to troubleshoot complex software issues. My deep understanding of data management and visualisation tools will allow me to make significant contributions to your team. In all positions, I have led the enhancement of software functionalities by identifying and repairing defects. My passion for technology, hands-on approach, and managerial experience make me a well-rounded engineer.",
    whatWeOffer: [
      "Work within cross-functional teams to drive the implementation of new features as well as resolve operational issues",
      "Develop an in-depth understanding of the company's product architecture and frameworks",
      "Stay abreast of new technologies and issues, including security issues as they evolve",
      "Ensure platform quality and adherence to performance standards",
      "Assist with the development, testing, and launch of new products",
    ],
    requirements:[
      "Bachelor's degree in Computer Science, Information Technology, or a related field.",
      "Relevant certifications in cloud platforms (e.g., AWS, Azure, GCP) is a plus.",
      "Proven experience as a Platform Engineer or a similar role.",
      "Strong background in designing, implementing, and managing scalable and secure cloud-based infrastructure.",
      "Proficiency in cloud services, such as AWS, Azure, or GCP.",
      "Experience with containerization technologies (Docker, Kubernetes)."
    ],
    responsibilities: [
      "Work within cross-functional teams to drive the implementation of new features as well as resolve operational issues",
      "Develop an in-depth understanding of the company's product architecture and frameworks",
      "Stay abreast of new technologies and issues, including security issues as they evolve",
      "Ensure platform quality and adherence to performance standards",
      "Assist with the development, testing, and launch of new products",
    ],
    qualifications: [
      "Development and maintenance of platform services",
      "Design and implement APIs",
      "Building tools for automation",
      "Collaborate closely with other engineering teams to improve our product, making it more user-friendly, reliable, and scalable",
      "Respond to system incidents and participate in an on-call rotation",
    ],
    salary: "$80,000 - $120,000 per year"
  },
  coverLetter: {
    title: "Cover Letter for Software Engineer Position",
    jobTitle: "Software Engineer",
    forUser: "Matthew Eddy",
    email: "test@email.com",
    phoneNumber: "123456789",
    toDaysDate: "",
    hiringManager: "Zina Eddy",
    company: "Netflix",
    introductionHeading:
      "Application for Software Engineer Position at Netflix",
    introductionContent:
      "Dear Zina Eddy,\nI am writing to express my strong interest in the Software Engineer position at Netflix. With over [number] years of experience as a seasoned software engineer, specializing in AWS, JavaScript, and Python, I am confident in my ability to contribute effectively to your team and help enhance the innovative projects at Netflix.",
    achievementsHeading: "Key Achievements:",
    achievements: [
      "- Successfully led the development of a scalable AWS infrastructure resulting in a 30% improvement in application performance.",
      "- Spearheaded the implementation of a new JavaScript framework, leading to a 40% reduction in page load times and an enhanced user experience.",
      "- Developed and launched a Python-based data processing tool that streamlined internal data analysis processes, saving over 100 man-hours per month.",
    ],
    conclusion:
      "I am excited about the opportunity to further discuss how my technical expertise and achievements can contribute to the continued success of Netflix. Thank you for considering my application. I look forward to the possibility of contributing to the dynamic team at Netflix.\nSincerely,\nMatthew Eddy",
  },
  simple: {
    title: "Reflections at Sunset: Embracing Life's Simple Joys",
    content: "In the quiet moments of reflection, as the sun sets and paints the sky in hues of warmth, I find solace in the simple joys of life. The gentle rustle of leaves in the evening breeze, the comforting aroma of a freshly brewed cup of tea, and the subtle symphony of nature's whispers create a serene backdrop to my thoughts. It's in these moments that I am reminded of the beauty that surrounds us, and the importance of appreciating the small, yet significant, wonders that make each day a gift. Life's journey is a collection of these moments, woven together into a tapestry of memories and experiences that shape our existence."
  },
  updateNotice: {
    title: "Automatic DNS Adjustments for Enhanced Email Deliverability ",
    notice:
      "Please ensure that the following DNS adjustments are made to enhance email deliverability for Wordpress users. ",
    overview:
      "DNS adjustments are crucial for ensuring that emails sent from your Wordpress website are delivered successfully and do not end up in spam folders.",
      actionsRequired: [
        "Add SPF and DKIM records to your domain's DNS settings.",
        "Ensure that your domain's DNS records include a valid DMARC policy.",
        "Regularly monitor and update your DNS settings to maintain optimal deliverability.",
      ],
    assistance:
          "If you need assistance with making these DNS adjustments, consider reaching out to your hosting provider or a qualified IT professional.",
  },
  resume: {
    title: "",
    userName: "Matthew Eddy",
    jobTitle: "Seasoned Software Engineer",
    phoneNumber: "123456789",
    email: "test@email.com",
    website: "meddy672.com",
    overview: "",
    experience: [
      {
        company: "Amazon",
        date: "2016 - Present",
        position: "Senior Software Engineer",
        achievements: [
          "Led the development of several critical projects on AWS",
          "Implemented innovative solutions for scalability and performance improvement",
        ],
      },
      {
        company: "Google",
        date: "2014 - 2016",
        position: "Software Engineer",
        achievements: [
          "Developed key features for a widely used web application",
          "Collaborated with cross-functional teams to deliver high-quality products",
        ],
      },
    ],
    education: {
      university: "Kennsaw University",
      gradDate: "May 19 2019",
      degree: "Bachelors in Science",
      details: "",
    },
    skills: [
      "AWS",
      "JavaScript",
      "Python",
      "Software Development",
      "Scalability",
      "Performance Improvement",
    ],
  },
  table: {
    pages: [
      {
        title: "Crime in Major Cities",
        content: [
          {
            heading: "Overview of Crime in Major Cities",
            body: "The paper will provide an in-depth analysis of the crime rates in major cities, focusing on key statistics and trends.",
          },
        ],
        table: {
          headers: ["City", "Crime Rate"],
          data: [
            ["New York City", 1500],
            ["Los Angeles", 1200],
            ["Chicago", 1000],
            ["Houston", 900],
          ],
        },
      },
    ],
  },
  recipe: {
    title: "Homemade Chicken Nuggets",
    totalTime: "30 minutes",
    preparation: "10 minutes",
    ingredients: [
      "1 lb boneless, skinless chicken breasts",
      "1 cup breadcrumbs",
      "1/2 cup grated Parmesan cheese",
      "1 tsp garlic powder",
      "1 tsp onion powder",
      "1/2 tsp paprika",
      "1/2 tsp salt",
      "1/4 tsp black pepper",
      "2 eggs",
      "2 tbsp milk",
      "Vegetable oil for frying",
    ],
    cookTime: "20 minutes",
    cookingSteps: [
      "1. Cut the chicken breasts into bite-sized pieces.",
      "2. In a shallow dish, mix the breadcrumbs, Parmesan cheese, garlic powder, onion powder, paprika, salt, and pepper.",
      "3. In another shallow dish, whisk together the eggs and milk.",
      "4. Dip each piece of chicken into the egg mixture, then coat with the breadcrumb mixture, pressing to adhere.",
      "5. Heat the vegetable oil in a large skillet over medium-high heat.",
      "6. Fry the chicken nuggets in batches for 4-5 minutes per side, until golden brown and cooked through.",
      "7. Remove the nuggets from the skillet and place on a paper towel-lined plate to drain excess oil.",
      "8. Serve the homemade chicken nuggets with your favorite dipping sauce.",
      "9. Enjoy!",
    ],
    serving: "4 servings",
  },
  documentary: {
    title: "Michael Jordan: A Basketball Legend",
    introduction:
      "Michael Jordan is widely regarded as one of the greatest basketball players of all time. His extraordinary skills, competitive spirit, and relentless work ethic made him a global icon. This documentary explores the life, career, and impact of the legendary Michael Jordan.",
    chapter1: [
      {
        heading: "Early Life and College Career",
        paragraph1:
          "Michael Jeffrey Jordan was born on February 17, 1963, in Brooklyn, New York. He showed exceptional talent in basketball from a young age and continued to excel throughout his high school and college years. In 1982, he made the game-winning shot in the NCAA Championship game as a freshman at the University of North Carolina, solidifying his reputation as a future basketball superstar.",
        paragraph2:
          "After three impressive seasons with the Tar Heels, Jordan entered the NBA Draft in 1984 and was selected by the Chicago Bulls as the third overall pick.",
      },
    ],
    chapter2: [
      {
        heading: "NBA Career and Championships",
        paragraph1:
          "Jordan quickly established himself as a force to be reckoned with in the NBA. His scoring ability, athleticism, and competitive drive set him apart from his peers. He led the Chicago Bulls to six NBA championships and earned five regular-season MVP awards during his illustrious career.",
        paragraph2:
          "His impact went beyond his on-court performance, as he became a global superstar and transcended the sport of basketball.",
      },
    ],
    chapter3: [
      {
        heading: "Retirement and Comeback",
        paragraph1:
          "After achieving unparalleled success with the Bulls, Jordan retired from basketball in 1993. He pursued a career in baseball but eventually returned to the NBA in 1995. His comeback reignited the Bulls' championship aspirations and further solidified his legacy as a basketball icon.",
        paragraph2:
          "Jordan's return to the game captivated fans worldwide and showcased his enduring impact on the sport.",
      },
    ],
    chapter4: [
      {
        heading: "Off the Court and Business Ventures",
        paragraph1:
          "Beyond his basketball career, Michael Jordan became a successful entrepreneur and influential figure in the business world. He established the Jordan Brand, a subsidiary of Nike, which has become a multi-billion dollar global brand. Jordan's business acumen and marketing prowess have made him one of the most recognizable and financially successful athletes in history.",
        paragraph2:
          "His contributions to various philanthropic endeavors and his impact on popular culture have solidified his status as a global cultural icon.",
      },
    ],
    conclusion:
      "Michael Jordan's impact on the world of basketball and beyond is immeasurable. His unparalleled talent, relentless drive, and overarching influence have left an indelible mark on the sport, popular culture, and the global community. Through his remarkable journey, he has inspired countless individuals to pursue excellence and chase their dreams, cementing his legacy as a true legend.",
  },
  sports: [
    {
      author: "Your Name",
      created: "2022-10-15T12:00:00",
      title: "History of Sports",
      content: [
        {
          heading: "Introduction",
          body: "Sports have been an integral part of human history...",
        },
        {
          heading: "Ancient Sports",
          body: "In ancient civilizations such as Greece and Rome, sports were highly valued...",
        },
        {
          heading: "Medieval and Renaissance Sports",
          body: "During the medieval and renaissance periods, sports evolved in various forms...",
        },
        {
          heading: "Modern Sports",
          body: "The modern era has seen the commercialization and globalization of sports...",
        },
        {
          heading: "Conclusion",
          body: "In conclusion, the history of sports is a testament to the enduring appeal of physical competition...",
        },
      ],
    },
    {
      links: [
        {
          text: "Learn more about sports history",
          link: "https://en.wikipedia.org/wiki/History_of_sport",
        },
      ],
    },
  ],
};

export const chatCreateArgs = {
  messages: [
    {
      content:
        'Return the message content as a json object so that it can be parsed using the JSON.parse static method. The json object needs to be in the in the following format: {"name":"basicExample","requestFormat":{"title":"","author":"","created":"","content":[{"heading":"","prargraph":""}]}}',
      role: "system",
    },
    { content: "Write a paper about Whales.", role: "user" },
  ],
  model: "gpt-3.5-turbo-1106",
  response_format: { type: "json_object" },
};
