import { PrismaClient, UserType, JobPostStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const companies = [
    {
      name: "Google",
      location: "Mountain View, CA",
      about:
        "Google LLC is an American multinational technology company that specializes in Internet-related services and products.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
      website: "https://google.com",
      xAccount: "@Google",
    },
    {
      name: "Microsoft",
      location: "Redmond, WA",
      about:
        "Microsoft Corporation is an American multinational technology corporation that produces computer software, consumer electronics, personal computers, and related services.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      website: "https://microsoft.com",
      xAccount: "@Microsoft",
    },
    {
      name: "Amazon",
      location: "Seattle, WA",
      about:
        "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
      website: "https://amazon.com",
      xAccount: "@Amazon",
    },
    {
      name: "Meta",
      location: "Menlo Park, CA",
      about:
        "Meta Platforms, Inc., doing business as Meta, is an American multinational technology conglomerate that owns and operates Facebook, Instagram, and WhatsApp.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png",
      website: "https://meta.com",
      xAccount: "@Meta",
    },
    {
      name: "Apple",
      location: "Cupertino, CA",
      about:
        "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
      website: "https://apple.com",
      xAccount: "@Apple",
    },
  ];

  // Job titles for tech companies
  const jobTitles = [
    "Senior Software Engineer",
    "Full Stack Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "DevOps Engineer",
    "Site Reliability Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Product Manager",
    "UX/UI Designer",
    "Engineering Manager",
    "Cloud Architect",
    "Mobile Developer",
    "QA Engineer",
    "Technical Program Manager",
  ];

  // Employment types
  const employmentTypes = ["Full-time", "Part-time", "Contract", "Remote"];

  // Benefits
  const allBenefits = [
    "Health Insurance",
    "Dental Insurance",
    "Vision Insurance",
    "401(k)/Retirement Plan",
    "Paid Time Off",
    "Remote Work Options",
    "Flexible Hours",
    "Professional Development",
    "Gym Membership",
    "Free Lunches",
    "Stock Options",
    "Parental Leave",
    "Mental Health Services",
    "Tuition Reimbursement",
    "Home Office Stipend",
  ];

  // Job descriptions template parts
  const introductions = [
    "Join our team to build cutting-edge solutions that impact millions of users worldwide.",
    "We are looking for a talented professional to help us build the future of technology.",
    "Be part of a team that's revolutionizing the industry with innovative products and services.",
    "Help us solve complex problems and create exceptional user experiences.",
    "Join our mission to connect people and build transformative technologies.",
  ];

  const responsibilities = [
    "Design, develop, and maintain high-quality software solutions",
    "Collaborate with cross-functional teams to define product requirements",
    "Write clean, efficient, and well-documented code",
    "Participate in code reviews and provide constructive feedback",
    "Troubleshoot and fix bugs in existing applications",
    "Implement automated tests to ensure code quality",
    "Optimize applications for maximum speed and scalability",
    "Stay up-to-date with emerging trends and technologies",
  ];

  const requirements = [
    "Bachelor's degree in Computer Science, Engineering, or related field",
    "Strong proficiency in one or more programming languages",
    "Experience with modern frameworks and development practices",
    "Knowledge of database systems and cloud services",
    "Excellent problem-solving and analytical skills",
    "Strong communication and collaboration abilities",
    "Experience with agile development methodologies",
  ];

  // Create users for each company
  for (const company of companies) {
    // Add a random identifier to email to avoid conflicts with existing records
    const randomId = Math.random().toString(36).substring(2, 10);
    const email = `hr-${randomId}@${company.name.toLowerCase().replace(/\s+/g, "")}.com`;

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: `${company.name} HR`,
        userType: UserType.COMPANY,
        onboardingCompleted: true,
        stripeCustomerId: `cus_${Math.random().toString(36).substring(2, 15)}`,
      },
    });

    // Create company
    const createdCompany = await prisma.company.create({
      data: {
        ...company,
        userId: user.id,
      },
    });

    // Create 3-5 job postings for each company
    const numJobPosts = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < numJobPosts; i++) {
      // Random job details
      const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      const employmentType =
        employmentTypes[Math.floor(Math.random() * employmentTypes.length)];
      const salaryFrom = 80000 + Math.floor(Math.random() * 40000);
      const salaryTo = salaryFrom + 20000 + Math.floor(Math.random() * 60000);
      const listingDuration = [30, 60, 90][Math.floor(Math.random() * 3)];

      // Random 4-8 benefits
      const numBenefits = Math.floor(Math.random() * 5) + 4;
      const benefits = [...allBenefits]
        .sort(() => 0.5 - Math.random())
        .slice(0, numBenefits);

      // Generate introduction
      const introduction =
        introductions[Math.floor(Math.random() * introductions.length)];

      // Get random responsibilities and requirements
      const selectedResponsibilities = [...responsibilities]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 4);

      const selectedRequirements = [...requirements]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 3);

      // Create job description in the required JSON format
      const jobDescriptionContent = [];

      // Title
      jobDescriptionContent.push({
        type: "heading",
        attrs: { level: 1, textAlign: null },
        content: [{ type: "text", text: `${jobTitle} at ${company.name}` }],
      });

      // Introduction
      jobDescriptionContent.push({
        type: "paragraph",
        attrs: { textAlign: null },
        content: [{ type: "text", text: introduction }],
      });

      // About the Role
      jobDescriptionContent.push({
        type: "heading",
        attrs: { level: 2, textAlign: null },
        content: [{ type: "text", text: "About the Role" }],
      });

      jobDescriptionContent.push({
        type: "paragraph",
        attrs: { textAlign: null },
        content: [
          {
            type: "text",
            text: `We are seeking a talented ${jobTitle} to join our team in ${company.location}. This is a ${employmentType.toLowerCase()} position offering a competitive salary range of $${(salaryFrom / 1000).toFixed(0)}k - $${(salaryTo / 1000).toFixed(0)}k per year.`,
          },
        ],
      });

      // Responsibilities
      jobDescriptionContent.push({
        type: "heading",
        attrs: { level: 2, textAlign: null },
        content: [{ type: "text", text: "Responsibilities" }],
      });

      // Add each responsibility as a bullet point
      for (const resp of selectedResponsibilities) {
        jobDescriptionContent.push({
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  attrs: { textAlign: null },
                  content: [{ type: "text", text: resp }],
                },
              ],
            },
          ],
        });
      }

      // Requirements
      jobDescriptionContent.push({
        type: "heading",
        attrs: { level: 2, textAlign: null },
        content: [{ type: "text", text: "Requirements" }],
      });

      // Add each requirement as a bullet point
      for (const req of selectedRequirements) {
        jobDescriptionContent.push({
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  attrs: { textAlign: null },
                  content: [{ type: "text", text: req }],
                },
              ],
            },
          ],
        });
      }

      // Why Join Us section
      jobDescriptionContent.push({
        type: "heading",
        attrs: { level: 2, textAlign: null },
        content: [{ type: "text", text: "Why Join Us?" }],
      });

      jobDescriptionContent.push({
        type: "paragraph",
        attrs: { textAlign: null },
        content: [
          {
            type: "text",
            text: `At ${company.name}, we offer a collaborative work environment with opportunities for growth and innovation. We value diversity, inclusion, and work-life balance.`,
          },
        ],
      });

      jobDescriptionContent.push({
        type: "paragraph",
        attrs: { textAlign: null },
        content: [
          {
            type: "text",
            text: "Apply today to become part of our amazing team!",
          },
        ],
      });

      // Create the final job description JSON
      const jobDescription = JSON.stringify({
        type: "doc",
        content: jobDescriptionContent,
      });

      // Create job post
      await prisma.jobPost.create({
        data: {
          jobTitle,
          employmentType,
          location: company.location,
          salaryFrom,
          salaryTo,
          jobDescription,
          listingDuration,
          benefits,
          status:
            Math.random() > 0.5 ? JobPostStatus.ACTIVE : JobPostStatus.DRAFT,
          companyId: createdCompany.id,
        },
      });
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
