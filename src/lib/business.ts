// The café's facts in one place, read by the header, footer, home and Visit pages.
// Wrenwick Roast House is fictional: the town, street and 555 number don't exist.
//
// The address, phone number and hours are also editable in the CMS ("contact-details"
// and "hours" groups). Once edited there, the CMS copy is what visitors see; these
// values are only the starting copy.
export const business = {
    name: "Wrenwick Roast House",
    shortName: "Wrenwick",
    founded: "2014",
    street: "214 Harbor Street",
    locality: "Wrenwick, OR 97399",
    phone: {
        display: "(541) 555-0142",
        href: "tel:+15415550142",
    },
    email: "hello@wrenwick.example",
};

// One row per day, Monday first. `id` is the CMS element ID, so don't rename it.
export const hours = [
    { id: "mon", day: "Monday", time: "7 am – 3 pm" },
    { id: "tue", day: "Tuesday", time: "7 am – 3 pm" },
    { id: "wed", day: "Wednesday", time: "7 am – 3 pm" },
    { id: "thu", day: "Thursday", time: "7 am – 6 pm" },
    { id: "fri", day: "Friday", time: "7 am – 9 pm" },
    { id: "sat", day: "Saturday", time: "8 am – 9 pm" },
    { id: "sun", day: "Sunday", time: "8 am – 2 pm" },
];

export const navLinks = [
    { href: "/menu/", label: "Menu" },
    { href: "/events/", label: "Events" },
    { href: "/about/", label: "About" },
    { href: "/visit/", label: "Visit" },
];
