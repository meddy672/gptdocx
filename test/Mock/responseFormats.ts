export const responseFormats = {
    basicExample: {
        title: 'How to Type Faster',
        author: 'John Smith',
        created: "1/19/2024",
        content: [
          {
            heading: 'Introduction',
            body: "Typing faster can greatly improve productivity in today's digital age. By using efficient techniques and practicing consistently, anyone can increase their typing speed and accuracy. This paper will provide useful tips and exercises to help you type faster and more effectively."
          },
          {
            heading: 'Proper Finger Placement',
            body: "One of the key factors in typing faster is to adopt the correct finger placement on the keyboard. Begin by placing your fingers on the home row keys ('ASDF' for the left hand and 'JKL;' for the right hand) with your thumbs resting on the spacebar. Maintaining this position will allow you to reach all other keys easily and reduce unnecessary finger movements, ultimately speeding up your typing."
          },
          {
            heading: 'Touch Typing Technique',
            body: 'The touch typing technique involves typing without looking at the keyboard or individual keys. This method enables you to develop muscle memory and increases typing speed. Start by familiarizing yourself with the key layout and practice typing simple sentences without peeking at your hands. Gradually increase the difficulty level and challenge yourself to type accurately without visual guidance.'
          },
          {
            heading: 'Practice and Speed Building',
            body: 'Regular practice is essential for improving typing speed. Dedicate specific time periods each day to practice typing exercises or engaging with typing software. Additionally, using online typing games and apps can make the learning process more enjoyable. Set realistic goals to gradually increase your speed, focusing not only on velocity but also on accuracy. Speed will naturally improve over time with consistent effort.'      
          }
        ],
      },
    jobApp: {
        title: "",
        jobName: "",
        overview: "",
        content: [
            {
                heading: "",
                whatWeOffer: []
            },
            {
                heading: "",
                responsibilities: []
            },
            {
                heading: "",
                qulifications: []
            },
            {
                heading: "",
                salary: ""
            }
        ]
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
        introductionHeading: "Application for Software Engineer Position at Netflix",
        introductionContent: "Dear Zina Eddy,\nI am writing to express my strong interest in the Software Engineer position at Netflix. With over [number] years of experience as a seasoned software engineer, specializing in AWS, JavaScript, and Python, I am confident in my ability to contribute effectively to your team and help enhance the innovative projects at Netflix.",
        achievementsHeading: "Key Achievements:",
        achievements: [
          "- Successfully led the development of a scalable AWS infrastructure resulting in a 30% improvement in application performance.",
          "- Spearheaded the implementation of a new JavaScript framework, leading to a 40% reduction in page load times and an enhanced user experience.",
          "- Developed and launched a Python-based data processing tool that streamlined internal data analysis processes, saving over 100 man-hours per month.",
        ],
        conclusion: "I am excited about the opportunity to further discuss how my technical expertise and achievements can contribute to the continued success of Netflix. Thank you for considering my application. I look forward to the possibility of contributing to the dynamic team at Netflix.\nSincerely,\nMatthew Eddy",
      },
    updateNotice: {
        title: "",
        notice: "",
        overview: "",
        content: [
            {
                heading: "",
                actionsRequired: []
            },
            {
                heading: "",
                assistance: ""
            }
        ],
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
      }
}

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
