import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import Newsletterbox from '../components/Newsletterbox'

const About = () => {
  return (
    <div>

      {/* ABOUT TITLE */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* ABOUT CONTENT */}
      <div className="my-10 flex flex-col md:flex-row gap-16 px-6">

        <img
          src={assets.aboutus_img}
          className="w-full md:max-w-[450px] rounded-md"
          alt="Trawl Fishing Net Manufacturing"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700">

          <p>
            <b>Netwala Firm</b> is a manufacturer of trawl fishing nets with
            more than <b>20+ years of experience</b> in the fishing industry.
            We focus on producing strong and reliable fishing nets suitable
            for both coastal and deep sea fishing.
          </p>

          <p>
            The firm is run by <b>Gopal R. Jungi</b>, also widely known as
            <b> Gopalbhai Ozavala</b>, who brings decades of hands-on experience
            and deep knowledge of fishing net manufacturing.
          </p>

          <p>
            By working closely with fishermen over the years, we have gained
            practical understanding of real fishing conditions. This helps us
            manufacture nets that perform consistently and last longer in
            marine environments.
          </p>

          <b className="text-gray-900">Our Mission</b>

          <p>
            Our mission is to provide fishermen with
            <b> high-quality trawl fishing nets </b>
            that offer strength, durability, and dependable performance.
            We aim to support fishermen by delivering products they can trust
            for their daily fishing operations.
          </p>

        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-xl py-4 text-center">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 px-6">

        <div className="border px-8 md:px-12 py-8 flex flex-col gap-4">
          <b>20+ Years of Experience</b>
          <p className="text-gray-600">
            Decades of experience in fishing net manufacturing and close
            collaboration with fishermen.
          </p>
        </div>

        <div className="border px-8 md:px-12 py-8 flex flex-col gap-4">
          <b>New Net Development</b>
          <p className="text-gray-600">
            We continuously experiment with and develop new types of fishing
            nets to meet evolving fishing methods and requirements.
          </p>
        </div>

        <div className="border px-8 md:px-12 py-8 flex flex-col gap-4">
          <b>Custom & Special Orders</b>
          <p className="text-gray-600">
            We accept custom-size and special requirement orders and work
            directly with fishermen to deliver suitable net solutions.
          </p>
        </div>

      </div>

      <Newsletterbox />

    </div>
  )
}

export default About
