import React from "react";

// FakeReviewComponent.jsx — ReelDeal themed review section using Tailwind CSS
export default function FakeReviewComponent() {
    const reviews = [
        {
            name: "Aisha Thompson",
            title: "Professional Angler",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 5,
            verified: true,
            date: "Oct 10, 2025",
            text: "I've been fishing for over 10 years, and ReelDeal truly stands out. Their rods and reels perform flawlessly every time. The quality is unmatched, and their customer service is top-notch!"
        },
        {
            name: "Carlos Mendes",
            title: "Coastal Guide & Fishing Instructor",
            avatar: "https://randomuser.me/api/portraits/men/31.jpg",
            rating: 5,
            verified: true,
            date: "Sep 22, 2025",
            text: "ReelDeal has become my go-to supplier. I love how every product feels tested by real anglers. Their gear holds up perfectly during long days out on the water — absolute excellence."
        },
        {
            name: "Yuki Nakamura",
            title: "Weekend Fisherwoman",
            avatar: "https://randomuser.me/api/portraits/women/12.jpg",
            rating: 4,
            verified: false,
            date: "Aug 14, 2025",
            text: "Bought my first set of gear from ReelDeal last month — super impressed! Smooth reel action, sturdy rods, and quick delivery. You can really tell they care about quality."
        },
        {
            name: "David Collins",
            title: "Deep Sea Charter Captain",
            avatar: "https://randomuser.me/api/portraits/men/42.jpg",
            rating: 5,
            verified: true,
            date: "Jul 30, 2025",
            text: "Every trip, I rely on ReelDeal gear. Their rods handle big catches effortlessly. Reliable equipment that’s built to last — that’s why I stick with ReelDeal."
        },
        {
            name: "Maya Patel",
            title: "Outdoor Blogger",
            avatar: "https://randomuser.me/api/portraits/women/25.jpg",
            rating: 5,
            verified: true,
            date: "Jun 15, 2025",
            text: "ReelDeal perfectly blends performance with style. The gear not only looks amazing but also delivers outstanding performance on every trip. Highly recommend!"
        },
        {
            name: "Liam Johnson",
            title: "Tournament Fisher",
            avatar: "https://randomuser.me/api/portraits/men/5.jpg",
            rating: 4,
            verified: true,
            date: "May 5, 2025",
            text: "Used ReelDeal rods during my last tournament and they didn’t disappoint. Balanced, lightweight, and strong enough for big catches. Great investment!"
        },
        {
            name: "Sophia Rossi",
            title: "Fishing Enthusiast",
            avatar: "https://randomuser.me/api/portraits/women/30.jpg",
            rating: 5,
            verified: false,
            date: "Apr 10, 2025",
            text: "The customer service was super friendly and helped me choose the perfect starter kit. I’m already planning my next purchase from ReelDeal!"
        },
        {
            name: "James Kim",
            title: "Kayak Angler",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            rating: 5,
            verified: true,
            date: "Mar 3, 2025",
            text: "ReelDeal’s attention to detail is impressive. Even small accessories like hooks and lines feel premium. I wouldn’t shop anywhere else for my gear."
        },
        {
            name: "Elena Garcia",
            title: "Fishing Instructor",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
            rating: 5,
            verified: true,
            date: "Feb 22, 2025",
            text: "As an instructor, I recommend ReelDeal to all my students. Their gear helps beginners feel confident right from the start. Reliable and affordable!"
        },
        {
            name: "Noah Brown",
            title: "Recreational Fisher",
            avatar: "https://randomuser.me/api/portraits/men/13.jpg",
            rating: 4,
            verified: false,
            date: "Jan 10, 2025",
            text: "Found ReelDeal through a friend, and I’m glad I did. Great quality for the price, and the delivery was quick. Can’t wait for my next order!"
        }
    ];

    return (
        <section className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold">What Anglers Say About ReelDeal</h2>
                    <p className="text-sm text-gray-500 mt-1">Trusted partner in fishing excellence since 2020.</p>
                </div>

                <div className="hidden sm:flex items-center gap-3">
                    <span className="text-xs text-gray-500">Overall</span>
                    <div className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-white px-3 py-2 rounded-full font-semibold">
                        4.8 ★
                    </div>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((r, i) => (
                    <article
                        key={i}
                        className="relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <img
                                src={r.avatar}
                                alt={`${r.name} avatar`}
                                className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm"
                            />

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-semibold">{r.name}</h3>
                                        <p className="text-xs text-gray-400">{r.title}</p>
                                    </div>

                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1 mb-1">
                                            {Array.from({ length: 5 }).map((_, idx) => (
                                                <svg
                                                    key={idx}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill={idx < r.rating ? "currentColor" : "none"}
                                                    className={`w-4 h-4 ${idx < r.rating ? "text-yellow-400" : "text-gray-300 stroke-current"}`}
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.378 2.455a1 1 0 00-.364 1.118l1.287 3.964c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.383 2.504c-.783.57-1.838-.197-1.538-1.118l1.287-3.964a1 1 0 00-.364-1.118L2.625 9.39c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.05 2.927z" />
                                                </svg>
                                            ))}
                                        </div>

                                        <div className="text-xs text-gray-400">{r.date} {r.verified && <span className="ml-2 inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Verified</span>}</div>
                                    </div>
                                </div>

                                <p className="mt-4 text-gray-700 text-sm leading-relaxed">{r.text}</p>

                                <div className="mt-4 flex items-center gap-3">
                                    <button className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">Helpful</button>
                                    <button className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">Report</button>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-3 left-4 transform -translate-y-1/2 bg-white/90 border border-gray-100 rounded-full px-3 py-1 text-xs font-medium shadow">#{i + 1}</div>
                    </article>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                {/* <a
                    href="#"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-sky-600 to-teal-600 text-white font-semibold shadow-lg hover:scale-[1.01] transition-transform"
                >
                    View All Angler Reviews
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a> */}
            </div>
        </section>
    );
}
