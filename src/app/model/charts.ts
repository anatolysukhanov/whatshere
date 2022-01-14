interface Chart {
    readonly data: Array<any>;
}

class LivabilityScoreChart implements Chart {
    transportation: number;
    housing: number;
    availability: number;
    business: number;
    jobs: number;
    congestion: number;
    greenness: number;

    constructor(transportation_score, housing_score, availability_score, business_competition_score, jobs_score, congestions_score, greeness_score) {
        this.transportation = transportation_score;
        this.housing = housing_score;
        this.availability = availability_score;
        this.business = business_competition_score;
        this.jobs = jobs_score;
        this.congestion = congestions_score;
        this.greenness = greeness_score;
    }

    get colors(): Array<any> {
        return [
            {
                name: "p",
                value: "#3F98FF"
            },
            {
                name: "n",
                value: "#FF4641"
            }
        ];
    }

    get total(): number {
        return Math.round(this.transportation + this.housing + this.availability + this.business + this.jobs + this.congestion + this.greenness);
    }

    get data(): Array<any> {
        return [
            {
                name: "Transportation",
                series: [
                    {
                        name: this.transportation > 0 ? "p" : "n",
                        value: Math.round(this.transportation)
                    }
                ]
            },
            {
                name: "Housing",
                series: [
                    {
                        name: this.housing > 0 ? "p" : "n",
                        value: Math.round(this.housing)
                    }
                ]
            },
            {
                name: "Availability",
                series: [
                    {
                        name: this.availability > 0 ? "p" : "n",
                        value: Math.round(this.availability)
                    },
                ]
            },
            {
                name: "Business Competition",
                series: [
                    {
                        name: this.business > 0 ? "p" : "n",
                        value: Math.round(this.business)
                    }
                ]
            },
            {
                name: "Jobs",
                series: [
                    {
                        name: this.jobs > 0 ? "p" : "n",
                        value: Math.round(this.jobs)
                    }
                ]
            },
            {
                name: "Congestion",
                series: [
                    {
                        name: this.congestion > 0 ? "p" : "n",
                        value: Math.round(this.congestion)
                    }
                ]
            },
            {
                name: "Greenness",
                series: [
                    {
                        name: this.greenness > 0 ? "p" : "n",
                        value: Math.round(this.greenness)
                    }
                ]
            }
        ];
    }
}

class BestForInterestsChart implements Chart {

    constructor(private foodLiving, private travel, private leasure, private artCulture, private sports, private shopping) {
    }

    get data(): Array<any> {
        return [
            {
                name: "Interests",
                series: [
                    {
                        value: this.foodLiving || 0,
                        name: "Food & Dining"
                    },
                    {
                        value: this.travel || 0,
                        name: "Travel"
                    },
                    {
                        value: this.leasure || 0,
                        name: "Leasure"
                    },
                    {
                        value: this.artCulture || 0,
                        name: "Art & Culture"
                    },
                    {
                        value: this.sports || 0,
                        name: "Sports"
                    },
                    {
                        value: this.shopping || 0,
                        name: "Shopping"
                    },
                ]
            }
        ];
    }
}

class AreaCompositionChart implements Chart {

    constructor(private nature, private water, private infrastructure) {
    }

    get colors(): Array<any> {
        return [
            {
                name: "Nature",
                value: "#CBE3E3"
            },
            {
                name: "Water",
                value: "#232D41"
            },
            {
                name: "Infrastructure",
                value: "#FFC000"
            },
            {
                name: "Other",
                value: "#9C9C9C"
            }
        ];
    }

    get data(): Array<any> {
        return [
            {
                name: "Nature",
                value: Math.round(this.nature)
            },
            {
                name: "Water",
                value: Math.round(this.water)
            },
            {
                name: "Infrastructure",
                value: Math.round(this.infrastructure)
            },
            {
                name: "Other",
                value: 100 - Math.round(this.nature) - Math.round(this.water) - Math.round(this.infrastructure)
            }
        ];
    }
}

export { LivabilityScoreChart, AreaCompositionChart, BestForInterestsChart };
