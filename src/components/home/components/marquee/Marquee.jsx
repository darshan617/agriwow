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
                    {[...Array(2)].map((_, index) => (
                        <div className={`${styles.marqueeContent}`} key={index}>
                            {marqueeItems.map((item, i) => (
                                <div className={`${styles.item}`} key={i}>
                                    <span style={{
                                        display: "inline-block",
                                        marginRight: 8,
                                        width: 7,
                                        height: 7,
                                        background: "black",
                                        borderRadius: "50%",
                                        verticalAlign: "middle"
                                    }}></span>
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