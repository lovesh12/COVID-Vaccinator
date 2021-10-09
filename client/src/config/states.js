const states = [
    {
        "state_id": "1",
        "id": "1",
        "title": "Andaman and Nicobar Islands",
    },
    {
        "state_id": "2",
        "id": "2",
        "title": "Andhra Pradesh",
    },
    {
        "state_id": "3",
        "id": "3",
        "title": "Arunachal Pradesh",
    },
    {
        "state_id": "4",
        "id": "4",
        "title": "Assam",
    },
    {
        "state_id": "5",
        "id": "5",
        "title": "Bihar",
    },
    {
        "state_id": "6",
        "id": "6",
        "title": "Chandigarh",
    },
    {
        "state_id": "7",
        "id": "7",
        "title": "Chhattisgarh",
    },
    {
        "state_id": "8",
        "id": "8",
        "title": "Dadra and Nagar Haveli",
        "state_name": "Dadra and Nagar Haveli",
    },
    {
        "state_id": "9",
        "id": "9",
        "title": "Delhi",
    },
    {
        "state_id": "10",
        "id": "10",
        "title": "Goa",
        "state_name": "Goa",
        "total": 2015169,
        "partial_vaccinated": 1239741,
        "totally_vaccinated": 775428,
        "today": 10943
    },
    {
        "state_id": "11",
        "id": "11",
        "title": "Gujarat",
        "state_name": "Gujarat",
        "total": 64168289,
        "partial_vaccinated": 43137968,
        "totally_vaccinated": 21030321,
        "today": 372454
    },
    {
        "state_id": "12",
        "id": "12",
        "title": "Haryana",
        "state_name": "Haryana",
        "total": 23984728,
        "partial_vaccinated": 17117669,
        "totally_vaccinated": 6867059,
        "today": 96536
    },
    {
        "state_id": "13",
        "id": "13",
        "title": "Himachal Pradesh",
        "state_name": "Himachal Pradesh",
        "total": 8599377,
        "partial_vaccinated": 5679137,
        "totally_vaccinated": 2920240,
        "today": 17152
    },
    {
        "state_id": "14",
        "id": "14",
        "title": "Jammu and Kashmir",
        "state_name": "Jammu and Kashmir",
        "total": 12885390,
        "partial_vaccinated": 8922701,
        "totally_vaccinated": 3962689,
        "today": 86506
    },
    {
        "state_id": "15",
        "id": "15",
        "title": "Jharkhand",
        "state_name": "Jharkhand",
        "total": 18756967,
        "partial_vaccinated": 14202677,
        "totally_vaccinated": 4554290,
        "today": 65210
    },
    {
        "state_id": "16",
        "id": "16",
        "title": "Karnataka",
        "state_name": "Karnataka",
        "total": 58797462,
        "partial_vaccinated": 40099461,
        "totally_vaccinated": 18698001,
        "today": 158231
    },
    {
        "state_id": "17",
        "id": "17",
        "title": "Kerala",
        "state_name": "Kerala",
        "total": 36604429,
        "partial_vaccinated": 24937493,
        "totally_vaccinated": 11666936,
        "today": 51505
    },
    {
        "state_id": "18",
        "id": "18",
        "title": "Ladakh",
        "state_name": "Ladakh",
        "total": 350749,
        "partial_vaccinated": 206951,
        "totally_vaccinated": 143798,
        "today": 710
    },
    {
        "state_id": "19",
        "id": "19",
        "title": "Lakshadweep",
        "state_name": "Lakshadweep",
        "total": 98493,
        "partial_vaccinated": 54969,
        "totally_vaccinated": 43524,
        "today": 60
    },
    {
        "state_id": "20",
        "id": "20",
        "title": "Madhya Pradesh",
        "state_name": "Madhya Pradesh",
        "total": 65196835,
        "partial_vaccinated": 48975840,
        "totally_vaccinated": 16220995,
        "today": 221884
    },
    {
        "state_id": "21",
        "id": "21",
        "title": "Maharashtra",
        "state_name": "Maharashtra",
        "total": 87244377,
        "partial_vaccinated": 60621101,
        "totally_vaccinated": 26623276,
        "today": 811467
    },
    {
        "state_id": "22",
        "id": "22",
        "title": "Manipur",
        "state_name": "Manipur",
        "total": 1770657,
        "partial_vaccinated": 1230946,
        "totally_vaccinated": 539711,
        "today": 5710
    },
    {
        "state_id": "23",
        "id": "23",
        "title": "Meghalaya",
        "state_name": "Meghalaya",
        "total": 1603048,
        "partial_vaccinated": 1081052,
        "totally_vaccinated": 521996,
        "today": 5922
    },
    {
        "state_id": "24",
        "id": "24",
        "title": "Mizoram",
        "state_name": "Mizoram",
        "total": 1170583,
        "partial_vaccinated": 701290,
        "totally_vaccinated": 469293,
        "today": 488
    },
    {
        "state_id": "25",
        "id": "25",
        "title": "Nagaland",
        "state_name": "Nagaland",
        "total": 1101509,
        "partial_vaccinated": 694476,
        "totally_vaccinated": 407033,
        "today": 1458
    },
    {
        "state_id": "26",
        "id": "26",
        "title": "Odisha",
        "state_name": "Odisha",
        "total": 32654153,
        "partial_vaccinated": 23285118,
        "totally_vaccinated": 9369035,
        "today": 207587
    },
    {
        "state_id": "27",
        "id": "27",
        "title": "Puducherry",
        "state_name": "Puducherry",
        "total": 1059195,
        "partial_vaccinated": 713517,
        "totally_vaccinated": 345678,
        "today": 5177
    },
    {
        "state_id": "28",
        "id": "28",
        "title": "Punjab",
        "state_name": "Punjab",
        "total": 20581874,
        "partial_vaccinated": 15106470,
        "totally_vaccinated": 5475404,
        "today": 141289
    },
    {
        "state_id": "29",
        "id": "29",
        "title": "Rajasthan",
        "state_name": "Rajasthan",
        "total": 58618971,
        "partial_vaccinated": 41377264,
        "totally_vaccinated": 17241707,
        "today": 407870
    },
    {
        "state_id": "30",
        "id": "30",
        "title": "Sikkim",
        "state_name": "Sikkim",
        "total": 936358,
        "partial_vaccinated": 519995,
        "totally_vaccinated": 416363,
        "today": 2437
    },
    {
        "state_id": "31",
        "id": "31",
        "title": "Tamil Nadu",
        "state_name": "Tamil Nadu",
        "total": 50150485,
        "partial_vaccinated": 37568589,
        "totally_vaccinated": 12581896,
        "today": 100816
    },
    {
        "state_id": "32",
        "id": "32",
        "title": "Telangana",
        "state_name": "Telangana",
        "total": 27796404,
        "partial_vaccinated": 20067148,
        "totally_vaccinated": 7729256,
        "today": 229524
    },
    {
        "state_id": "33",
        "id": "33",
        "title": "Tripura",
        "state_name": "Tripura",
        "total": 3986276,
        "partial_vaccinated": 2500430,
        "totally_vaccinated": 1485846,
        "today": 10653
    },
    {
        "state_id": "34",
        "id": "34",
        "title": "Uttar Pradesh",
        "state_name": "Uttar Pradesh",
        "total": 114988264,
        "partial_vaccinated": 90759856,
        "totally_vaccinated": 24228408,
        "today": 411002
    },
    {
        "state_id": "35",
        "id": "35",
        "title": "Uttarakhand",
        "state_name": "Uttarakhand",
        "total": 10737461,
        "partial_vaccinated": 7410344,
        "totally_vaccinated": 3327117,
        "today": 22173
    },
    {
        "state_id": "36",
        "id": "36",
        "title": "West Bengal",
        "state_name": "West Bengal",
        "total": 64031421,
        "partial_vaccinated": 46088217,
        "totally_vaccinated": 17943204,
        "today": 1206689
    },
    {
        "state_id": "37",
        "id": "37",
        "title": "Daman and Diu",
        "state_name": "Daman and Diu",
        "total": 433808,
        "partial_vaccinated": 268368,
        "totally_vaccinated": 165440,
        "today": 2215
    }
]

export default states;