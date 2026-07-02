// Centralized AutoRex business configuration
// Update this file to change business info across the entire site

export const business = {
  name: "AutoRex Automotive",
  shortName: "AutoRex",
  tagline: "Professional Automotive Service & Repair",
  phone: "+1 (800) 555-0198",
  phoneDisplay: "+1 (800) 555-0198",
  email: "contact@autorex.com",
  address: {
    street: "1234 Motor Parkway",
    city: "Detroit",
    state: "MI",
    zip: "48201",
    full: "1234 Motor Parkway, Detroit, MI 48201",
  },
  hours: {
    weekdays: "Monday - Saturday 7:00AM - 6:00PM",
    sunday: "Closed",
  },
  social: {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  map: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3071.2910802067827!2d90.45905169331171!3d23.691532202989123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1577214205224!5m2!1sen!2sbd",
  topbarMessage: "Wait comfortably while we fix your car",
  founded: "1998",
  yearsExperience: "25",
} as const;

export type Business = typeof business;
