import AwsLogo from "@/components/partnerSponsorLogos/AwsLogo";
import EquinixLogo from "../components/partnerSponsorLogos/EquinixLogo";
import FortyFiveDrivesLogo from "../components/partnerSponsorLogos/FortyFiveDrivesLogo";
import GoogleCloudLogo from "../components/partnerSponsorLogos/GoogleCloudLogo";
import MattermostLogo from "../components/partnerSponsorLogos/MattermostLogo";
import OslLogo from "../components/partnerSponsorLogos/OslLogo";
import VmwareLogo from "../components/partnerSponsorLogos/VmwareLogo";
import ActLogo from "@/components/partnerSponsorLogos/ActLogo";

const partnerSponsorData = [
  {
    sponsors: [
      {
        tierOne: [
          {
            href: "https://45drives.com",
            logo: <FortyFiveDrivesLogo />,
            name: "45 Drives",
            description:
              "45Drives offers enterprise storage solutions built on powerful and robust open-source software that allows customers to benefit from the cost savings & flexibility of off-the-shelf hardware. Check them out for a fully supported data storage solution at the best cost per terabyte!",
          },
          {
            href: "https://aws.com",
            logo: <AwsLogo />,
            name: "AWS",
            description:
              "The RESF utilizes AWS to run much of the underlying infrastructure critical to the development and deployment of the services supporting Rocky Linux. From Koji builders for x86_64 and aarch64 running in EC2 to SRPM blob storage in S3, AWS is foundational to much of what we do.",
          },
          {
            href: "https://ciq.com",
            src: "/images/sponsors-partners/ciq.png",
            name: "CIQ",
            description:
              "We believe in helping people do great things. This is why CIQ is a founding sponsor of the RESF. We provide commercial support and services for Rocky Linux to customers in research, academia, government, enterprise, partners, and everyone in between.",
            founding: true,
            supportProvider: true,
            supportDescription:
              "We believe in helping people do great things. This is why CIQ is a founding partner of the RESF. We provide commercial support and services for Rocky Linux to customers in research, academia, government, enterprise, partners, and everyone in between.",
          },
          {
            href: "https://cloud.google.com",
            logo: <GoogleCloudLogo />,
            name: "Google Cloud",
            description:
              "As a principal sponsor of the RESF, Google understands the importance of Rocky Linux as a free, open, community enterprise operating system. Providing resources for testing and validation, we've partnered with the RESF to ensure Rocky's status as a first-class citizen on the Google Cloud Platform from day one.",
          },
          {
            href: "https://www.mvista.com",
            src: "/images/sponsors-partners/montavista.png",
            name: "MontaVista",
            description:
              "MontaVista Software is the leader in embedded commercial LInux, supporting MontaVista CGX, Yocto Project®, CentOS and Rocky Linux. MontaVista offers Open Source Software expertise, commercial-quality Linux distros, cost-effective maintenance and support for 10+ year life-cycles.",
            supportProvider: true,
            supportDescription:
              "MontaVista Software is the leader in embedded commercial LInux, supporting MontaVista CGX, Yocto Project®️, CentOS and Rocky Linux. MontaVista offers Open Source Software expertise, commercial-quality Linux distros, cost-effective maintenance and support for 10+ year life-cycles.",
          },
          {
            href: "https://opendrives.com",
            src: "/images/sponsors-partners/opendrives.png",
            name: "OpenDrives",
            description:
              "OpenDrives is a global provider of enterprise-scale, software-defined data storage solutions. Our technology is designed to power the most demanding workflows—on premises and in the cloud. Our commitment to open standards and protocols facilitates ease of integrations, making it simpler for customers to access, use, move, and protect their data. We are headquartered in Culver City, CA.",
          },
          {
            href: "https://symphony.rakuten.com",
            src: "/images/sponsors-partners/rakutensymphony.svg",
            name: "Rakuten Symphony",
            description:
              "Rakuten Symphony is a strong believer that open source communities encourage innovation through collaboration. Deployment of Rocky Linux represents a return to true open-source principles, powered by open communities. Rakuten Symphony is working closely with a broad spectrum of third-party vendors and technology partners within the telecom industry to make Rocky Linux the standard operating system for running large networks.",
          },
          {
            href: "https://vmware.com",
            logo: <VmwareLogo />,
            name: "VMware",
            description:
              "VMware is a leading provider of multi-cloud services for all apps, enabling digital innovation with enterprise control.",
          },
        ],
        tierFour: [
          {
            href: "https://www.openlogic.com/",
            name: "OpenLogic by Perforce",
            supportProvider: true,
          },
          {
            href: "https://www.procomputers.com/",
            name: "ProComputers.com",
          },
          {
            href: "https://www.seagategov.com/",
            name: "Seagate Federal",
          },
        ],
      },
    ],
    partners: [
      {
        tierOne: [
          {
            href: "https://advancedclustering.com/",
            logo: <ActLogo />,
            name: "Advanced Clustering Technologies",
            description:
              "Advanced Clustering Technologies has been building custom, turn-key high performance computing systems since 2001. We provide on premises and cloud HPC solutions based on the latest architectures. Learn more, configure a system, and request a quote at advancedclustering.com.",
          },
          {
            href: "https://arm.com",
            src: "/images/sponsors-partners/arm.svg",
            name: "ARM",
            description:
              "Arm is committed to ensuring its architecture is a first-class citizen from day one with Rocky Linux. We have partnered with the RESF, providing dedicated engineering efforts to complement Rocky Linux development and testing teams, working closely together to test, validate, and support ARM now and long into the future.",
          },
          {
            href: "https://ciq.com",
            src: "/images/sponsors-partners/ciq.png",
            name: "CIQ",
            description:
              "We believe in helping people do great things. This is why CIQ is a founding partner of the RESF. We provide commercial support and services for Rocky Linux to customers in research, academia, government, enterprise, partners, and everyone in between.",
            founding: true,
          },
          {
            href: "https://equinix.com",
            logo: <EquinixLogo />,
            name: "Equinix",
            description:
              "Equinix is the world's digital infrastructure company. Digital leaders harness our trusted platform to bring together and interconnect the foundational infrastructure that powers their success.",
          },
          {
            href: "https://fastly.com",
            src: "/images/sponsors-partners/fastly.svg",
            name: "Fastly",
            description:
              "Fastly's edge cloud platform enables customers to create great digital experiences quickly, securely, and reliably by processing, serving, and securing our customers' applications as close to their end-users as possible — at the edge of the internet.",
          },
          {
            href: "https://mattermost.com",
            logo: <MattermostLogo />,
            name: "Mattermost",
            description:
              "Mattermost is an open source messaging solution made for organizations with the highest security requirements. As big believers in the power of open source, Mattermost is thrilled to partner with RESF to help bring an enterprise-grade distribution of Linux to the tech community.",
          },
          {
            href: "https://ncloud.com",
            src: "/images/sponsors-partners/navercloud.svg",
            name: "NAVER Cloud",
            description:
              "NAVER Cloud Platform is a South Korean cloud service that started in 2017 under NAVER Cloud, a subsidiary of NAVER. It provides over 170 individual services in 2021 and holds various security certifications including CSA STAR GOLD, GDPR, and more. It also currently provides cloud services in 10 locations around the world.",
          },
          {
            href: "https://osslab.co.kr",
            src: "/images/sponsors-partners/osslab.png",
            name: "OSSLAB",
            description:
              "OSSLAB is a South Korea IT firm established in 2013. Our aim is to achieve our clients' successful business outcomes, and to that end we provide professional services including open-source infrastructure technology support, big data platform implementation, and cloud/security solution technical support.",
          },
          {
            href: "https://osuosl.org",
            logo: <OslLogo />,
            name: "OSU Open Source Lab",
            description:
              "The Oregon State University Open Source Lab is a nonprofit organization working for the advancement of open source technologies. The OSL offers world-class hosting services, professional software development and on-the-ground training for promising students interested in open source management and programming.",
          },
          {
            href: "https://supermicro.com",
            src: "/images/sponsors-partners/supermicro.svg",
            name: "Supermicro",
            description:
              "As a global leader in high performance, high-efficiency server technology, and innovation Supermicro is excited to work with the RESF and deliver data center servers and storage systems optimized for Rocky Linux.",
          },
        ],
        tierFour: [
          {
            href: "https://crowdin.com",
            name: "Crowdin",
          },
          {
            href: "https://ontrackinternetsolutions.com",
            name: "OnTrack Internet Solutions",
          },
        ],
      },
    ],
  },
];

export default partnerSponsorData;
