export default function HeroSection() {
    // Dữ liệu các logo
    const logos = [
        { src: "acer.png" },
        { src: "Asus.png" },
        { src: "Dell.png" },
        { src: "HP.png" },
        { src: "Lenovo.png" },
        { src: "macbook.png" },
        { src: "masstel-mobile-logo022.png" },
        { src: "MSI.png" },
        { src: "vaio-removebg-preview_1.png" },
    ];

    return (
        <div className="overflow-hidden w-full m-4">
            <div className="flex animate-marquee">
                {logos.map((logo, index) => {
                    const altText = logo.src.split('.')[0];
                    return (
                        <img
                            key={index}
                            src={logo.src}
                            alt={altText}
                            className="mx-2 h-8"
                        />
                    );
                })}
            </div>
        </div>
    );
}
