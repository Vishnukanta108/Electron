const { doc } = require("prettier")

function Check(data){
    let diaposon_0_255 = '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|2[5][0-5])' //Регулярний вираз (true від 0 до 255). 
    let dot = '\.';
    let final = new RegExp('^' + diaposon_0_255 + dot + diaposon_0_255 + dot + diaposon_0_255 + dot + diaposon_0_255 + '$');//Регулярний вираз IP (0-255.0-255.0-255.0-255)
    if (final.test(data) == 0){
        alert("Помилка: нерпавильно введений IP")
        stop
    }
    return data;
}

function TypeClassificator(octet_1) {
    if (octet_1 <= 126) {
        index = 0
    }
    else if(octet_1 => 128 && octet_1 <= 191) {
        index = 1
    }
    else {
        index = 2
    }
    return index;
}

function IP_to_01(ip) {
    octet1 = ip.split('.')[0]
    octet2 = ip.split('.')[1]
    octet3 = ip.split('.')[2]
    octet4 = ip.split('.')[3]

    octet1 = parseInt(octet1)
    octet2 = parseInt(octet2)
    octet3 = parseInt(octet3)
    octet4 = parseInt(octet4)

    octet_01_1 = (octet1).toString(2)
    octet_01_2 = (octet2).toString(2)
    octet_01_3 = (octet3).toString(2)
    octet_01_4 = (octet4).toString(2)

    ip = octet_01_1 + '.' + octet_01_1 + '.' + octet_01_1 + '.' + octet_01_1
    return ip 
}

function TypeClass() {
    let classes = `[{
        "class": "A",
        "net_knot": "С.У.У.У",
        "subnet_mask_10": "255.0.0.0",
        "subnet_mask_2": "11111111.00000000.00000000.00000000",
        "available_PC_count": "16 77 214"
    },
    
    {
        "class": "В",
        "net_knot": "С.С.У.У",
        "subnet_mask_10": "255.255.0.0",
        "subnet_mask_2": "11111111.11111111.00000000.00000000",
        "available_PC_count": "65 534"
    },
    
    {
        "class": "С",
        "net_knot": "С.С.С.У",
        "subnet_mask_10": "255.255.255.0",
        "subnet_mask_2": "11111111.11111111.11111111.00000000",
        "available_PC_count": "254"
    }
    ]`
    
    data = document.getElementById("data").value
    let index
    let answer
    let clas
    let net_knot
    let subnet_mask_10 
    let subnet_mask_2
    let available_PC_count
    Check(data) //Перевірка на формат IP
    answer = data.split('.')[0] //Здобули значення першого октету. Щоб вивести вiдповідну інформацію 
    answer = parseInt(answer);
 
    index = TypeClassificator(answer)
   
    classes = JSON.parse(classes)
    clas = classes[index].class
    net_knot = classes[index].net_knot
    subnet_mask_10 = classes[index].subnet_mask_10
    subnet_mask_2 = classes[index].subnet_mask_2
    available_PC_count = classes[index].available_PC_count

    let ip_adress_01 = IP_to_01(data)
    document.getElementById("output").innerHTML = 
    `<p>Клас IP-адреси: ${clas}<br> 
        Двійкове представлення адреси: ${ip_adress_01}<br>
        Мережева (С) та вузлова (У) частини адреси: ${net_knot}<br>
        Маска підмережі (десяткове представлення): ${subnet_mask_10}<br>
        Маска підмережі (двійкове представлення): ${subnet_mask_2}<br>
        Число ймовірних вузлів (кількість ПК): ${available_PC_count}<br>

        
    
    </p>`
}
