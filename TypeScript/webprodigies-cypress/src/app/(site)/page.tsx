import clsx from "clsx";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { CustomCard } from "@/components/landing-page/custom-card";
import { TitleSection } from "@/components/landing-page/title-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from "@/lib/constants";
import db from "@/lib/supabase/db";

import Banner from "../../../public/appBanner.png";
import Cal from "../../../public/cal.png";
import CheckIcon from "../../../public/icons/check.svg";
import Diamond from "../../../public/icons/diamond.svg";

export default function HomePage() {
  console.log(db);
  return (
    <>
      <TopSection />
      <SlideSection />
      <TrackSection />
      <Testimonials />
      <Pricing />
    </>
  );
}

function TopSection() {
  return (
    <section
      className=" mt-10
      gap-4
      overflow-hidden
      px-4
      sm:flex
      sm:flex-col
      sm:px-6
      md:items-center
      md:justify-center"
    >
      <TitleSection
        pill="✨ Your Workspace, Perfected"
        title="All-In-One Collaboration and Productivity Platform"
      />
      <div
        className="mt-6
          rounded-xl
          bg-white
          bg-gradient-to-r
          from-primary
          to-brand-primaryBlue
          p-[2px]
          sm:w-[300px]
        "
      >
        <Button
          className=" w-full
            rounded-[10px]
            bg-background
            p-6
            text-2xl
          "
          variant="secondary"
        >
          Get Cypress Free
        </Button>
      </div>
      <div
        className="relative
          ml-[-50px]
          mt-[-40px]
          flex
          w-[750px]
          items-center
          justify-center
          sm:ml-0
          sm:w-full
          md:mt-[-90px]
        "
      >
        <Image alt="Application Banner" src={Banner} />
        <div
          className="absolute
            bottom-0
            left-0
            right-0
            top-[50%]
            z-10
            bg-gradient-to-t
            dark:from-background
          "
        ></div>
      </div>
    </section>
  );
}

function SlideSection() {
  return (
    <section className="relative">
      <div
        className="after:content['']
          before:content['']
          flex
          overflow-hidden
          before:absolute
          before:bottom-0
          before:left-0
          before:top-0
          before:z-10
          before:w-20
          before:bg-gradient-to-r
          before:from-background
          before:to-transparent
          after:absolute
          after:bottom-0
          after:right-0
          after:top-0
          after:z-10
          after:w-20
          after:bg-gradient-to-l
          after:from-background
          after:to-transparent
          before:dark:from-brand-dark
          after:dark:from-brand-dark"
      >
        {Array.from({ length: 2 }).map((arr, index) => (
          <div
            className="animate-slide
                flex
                flex-nowrap"
            key={index}
          >
            {CLIENTS.map((client) => (
              <div
                className="relative
                    m-20
                    flex
                    w-[200px]
                    shrink-0
                    items-center"
                key={client.alt}
              >
                <Image
                  alt={client.alt}
                  className="max-w-none object-contain"
                  src={client.logo}
                  width={200}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function TrackSection() {
  return (
    <section
      className="relative
        flex
        flex-col
        items-center
        justify-center
        px-4
        sm:px-6
      "
    >
      <div
        className="top-22
          absolute
          -z-10
          h-32
          w-[30%]
          rounded-full
          bg-brand-primaryPurple/50
          blur-[120px]
        "
      />
      <TitleSection
        pill="Features"
        subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
        title="Keep track of your meetings all in one place"
      />
      <div
        className="relative
          mt-10
          flex
          max-w-[450px]
          items-center
          justify-center
          rounded-2xl
          border-8
          border-washed-purple-300
          border-opacity-10 
          sm:ml-0
        "
      >
        <Image alt="Banner" className="rounded-2xl" src={Cal} />
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative">
      <div
        className="-z-100
          absolute
          top-56
          h-32
          w-full
          rounded-full
          bg-brand-primaryPurple/50
          blur-[120px]
        "
      />
      <div
        className="mt-20
          flex
          flex-col 
          overflow-visible
          overflow-x-hidden
          px-4
          sm:px-6
        "
      >
        <TitleSection
          pill="Testimonials"
          subheading="Join thousands of satisfied users who rely on our platform for their 
            personal and professional productivity needs."
          title="Trusted by all"
        />
        {Array.from({ length: 2 }).map((arr, index) => (
          <div
            className={twMerge(
              clsx("mt-10 flex flex-nowrap gap-6 self-start", {
                "flex-row-reverse": index === 1,
                "animate-[slide_250s_linear_infinite]": true,
                "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                "ml-[100vw]": index === 1,
              }),
              "hover:paused",
            )}
            key={index}
          >
            {USERS.map((testimonial, index) => (
              <CustomCard
                cardContent={
                  <p className="dark:text-washed-purple-800">
                    {testimonial.message}
                  </p>
                }
                cardHeader={
                  <div
                    className="flex
                      items-center
                      gap-4
                  "
                  >
                    <Avatar>
                      <AvatarImage src={`/avatars/${index + 1}.png`} />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-foreground">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="dark:text-washed-purple-800">
                        {testimonial.name.toLocaleLowerCase()}
                      </CardDescription>
                    </div>
                  </div>
                }
                className="shrink-0s
                  w-[500px]
                  rounded-xl
                  dark:bg-gradient-to-t
                  dark:from-border dark:to-background
                "
                key={testimonial.name}
              ></CustomCard>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section
      className="mt-20
        px-4
        sm:px-6
      "
    >
      <TitleSection
        pill="Pricing"
        subheading="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights."
        title="The Perfect Plan For You"
      />
      <div
        className="mt-10 
        flex
        flex-col-reverse
        items-center
        justify-center
        gap-4
        sm:flex-row
        sm:items-stretch
        "
      >
        {PRICING_CARDS.map((card) => (
          <CustomCard
            cardContent={
              <CardContent className="p-0">
                <span
                  className="text-2xl 
                    font-normal
                "
                >
                  ${card.price}
                </span>
                {+card.price > 0 ? (
                  <span className="ml-1 dark:text-washed-purple-800">/mo</span>
                ) : (
                  ""
                )}
                <p className="dark:text-washed-purple-800">
                  {card.description}
                </p>
                <Button className="mt-4 w-full whitespace-nowrap">
                  {card.planType === PRICING_PLANS.proplan
                    ? "Go Pro"
                    : "Get Started"}
                </Button>
              </CardContent>
            }
            cardFooter={
              <ul
                className="mb-2
                  flex
                  flex-col
                  gap-4
                  font-normal
                "
              >
                <small>{card.highlightFeature}</small>
                {card.features.map((feature) => (
                  <li
                    className="flex
                      items-center
                      gap-2
                    "
                    key={feature}
                  >
                    <Image alt="Check Icon" src={CheckIcon as StaticImport} />
                    {feature}
                  </li>
                ))}
              </ul>
            }
            cardHeader={
              <CardTitle
                className="text-2xl
                  font-semibold
              "
              >
                {card.planType === PRICING_PLANS.proplan && (
                  <>
                    <div
                      className="absolute top-0 -z-10 hidden h-32 w-full
                        rounded-full
                        bg-brand-primaryPurple/80
                        blur-[120px]
                        dark:block
                      "
                    />
                    <Image
                      alt="Pro Plan Icon"
                      className="absolute right-6 top-6"
                      src={Diamond as StaticImport}
                    />
                  </>
                )}
                {card.planType}
              </CardTitle>
            }
            className={clsx(
              "background-blur-3xl relative w-[300px] rounded-2xl dark:bg-black/40",
              {
                "border-brand-primaryPurple/70":
                  card.planType === PRICING_PLANS.proplan,
              },
            )}
            key={card.planType}
          />
        ))}
      </div>
    </section>
  );
}
