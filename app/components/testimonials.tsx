import { SectionLabel } from './editorial';
// Original customer testimonials and portraits migrated from merchantproinc.com.
const testimonials = [
  {
    "name": "Tif",
    "business": "Tif’s Foreign Car Care",
    "quote": "I am a very very happy client of Merchant Pro. Getting set up with them was really really simple and very very professional. I did not have to jump through a lot of hoops. The paperwork was done in a very organized fashion. Everybody was in touch with my team every single step of the way… I am very happy to recommend them to anybody under any circumstances",
    "image": "/images/testimonials/merchant-1.jpg"
  },
  {
    "name": "Dr. Rosenman",
    "business": "Springfield Lorton Dental Group",
    "quote": "I would like to extend my sincere appreciation and thank you for offering your services to Springfield Lorton Dental Group at a very generous savings of 30% on all our credit card processing fees. I will definitely be referring you to other businesses.",
    "image": "/images/testimonials/merchant-2.jpg"
  },
  {
    "name": "Ellyn",
    "business": "Ellyn B Designs",
    "quote": "Besides getting us a great rate, they really helped us get our money released after we did a launch and had a bunch of money held. They are always quick to respond, always keeps us in the loop, and always shoot straight",
    "image": "/images/testimonials/merchant-3.jpg"
  },
  {
    "name": "Melvena L Sherard",
    "business": "Melvena L Sherard DDA PA",
    "quote": "Merchant Pro is a user friendly system that when coupled with exceptional customer service – gives any business owner peace of mind. Big Thanks MerPro!",
    "image": "/images/testimonials/merchant-4.jpg"
  },
  {
    "name": "Paul Morris",
    "business": "Brothers Sew and Vac",
    "quote": "Best customer service I’ve experienced, probably ever! Dario and a few others assisted on getting my business up and going. Making sure my clover was functioning how I needed it to, my billing was adjusted to fit my needs and overall experience with Merpro has been thorough, thoughtful and reasonably priced! I will be telling my friends and other local businesses how happy I am as well! Thank you Merchant Pro!",
    "image": "/images/testimonials/merchant-5.jpg"
  },
  {
    "name": "Raul Villafane",
    "business": "Micro Performance",
    "quote": "Getting paid the next day with lower processing fees than with Shopify and I have personal representatives who handle all questions or issues without waiting on hold says it all. I’d give 10 Stars if I could.",
    "image": "/images/testimonials/merchant-6.jpg"
  }
];
export function Testimonials() {
 return <section className="testimonials-section" id="testimonials" aria-labelledby="testimonials-heading"><div className="wrap"><div className="testimonials-heading"><SectionLabel>In our merchants’ words</SectionLabel><h2 id="testimonials-heading">People behind the businesses.</h2></div><div className="testimonials-grid">{testimonials.map(({name,business,quote,image})=><figure className="testimonial" key={name}><div className="testimonial-stars" aria-label="5 out of 5 stars"><span aria-hidden="true">★★★★★</span></div><blockquote><p>{quote}</p></blockquote><figcaption><img src={image} alt={name} width="64" height="64" loading="lazy"/><div><b>{name}</b><span>{business}</span></div></figcaption></figure>)}</div></div></section>;
}
