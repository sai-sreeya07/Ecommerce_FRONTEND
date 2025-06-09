export const color=[
    "white",
    "black",
    "red",
    "marun",
    "being",
    "pink",
    "green",
    "yellow",
];

export const filters=[
    {
        id: "color",
        name:"Color",
        options: [
            {value: "white",label:"white"},
            {value: "beige",label:"Beign"},
            {value: "blue",label:"Blue"},
            {value: "brown",label:"Brown"},
            {value: "green",label:"Green"},
            {value: "purple",label:"Purple"},
            {value: "yellow",label:"Yellow"},
        ]
    }
]

export const singleFilters=[
    {
        id: "price",
        name:"price",
        options: [
            {value: "159-399",label:"white"},
            {value: "399-999",label:"Beign"},
            {value: "999-1999",label:"Blue"},
            {value: "1999-2999",label:"Brown"},
            {value: "3999-4999",label:"Green"},
        ]
    },
    {
        id: "discount",
        name:"Discount Range",
        options: [
            {value: "20",label:"20% And Above"},
            {value: "30",label:"30% And Above"},
            {value: "40",label:"40% And Above"},
            {value: "50",label:"50% And Above"},
            {value: "60",label:"60% And Above"},
            {value: "70",label:"70% And Above"},
            {value: "80",label:"80% And Above"},
        ]
    },
    {
        id: "stock",
        name:"Availablity",
        options: [
            {value: "in_stock", label:"In Stock"},
            {value: "out_of_stock", label:"Out Of Stock"},
        ]
    },

]