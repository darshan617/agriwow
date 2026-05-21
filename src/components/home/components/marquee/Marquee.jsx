import styles from '@/components/home/components/marquee/marquee.module.css'

const marqueeItems = [
    "On Selected Products",
    "UP TO 25% OFF",
    "On Selected Products",
    "UP TO 25% OFF",
    "On Selected Products",
];

export default function Marquee() {
    return (
        <section className={`${styles.marqueeSection}`}>
            <div className={`${styles.marquee}`}>
                <div className={`${styles.marqueeTrack}`}>
                    {[...Array(4)].map((_, index) => (
                        <div className={`${styles.marqueeContent}`} key={index}>
                            {marqueeItems.map((item, i) => (
                                <div className={`${styles.item}`} key={i}>
                                    <span className={`${styles.dot}`}></span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}