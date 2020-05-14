const URL_Products = 'https://acme-users-api-rev.herokuapp.com/api/products';
const URL_Companies = 'https://acme-users-api-rev.herokuapp.com/api/companies';


const products = axios.get(URL_Products)
    .then(res => {
        return (res.data)
    })

const companies = axios.get(URL_Companies)
    .then(res => {
        return (res.data)
    })


let headerContainer = document.createElement('div');
headerContainer.classList.add('navbar')

let companyLink = document.createElement('a');

let bt = document.createElement('button');
bt.innerText = 'Company (38)'
bt.classList.add('btn-group')

// companyLink.classList.add('btn')
// companyLink.classList.add('btn-primary')
// companyLink.classList.add('btn-lg')
// companyLink.classList.add('active')
companyLink.append(bt)

companyLink.href = `file:///Users/jakefroehlich/Desktop/fullstack/May13/index.html#companies`
let productLink = document.createElement('a')
productLink.innerText = 'Product (9)'
productLink.classList.add('btn')
productLink.classList.add('btn-primary')
productLink.classList.add('btn-lg')
// productLink.classList.add('active')
productLink.href = `file:///Users/jakefroehlich/Desktop/fullstack/May13/index.html#products`

headerContainer.appendChild(companyLink);
headerContainer.appendChild(productLink);



const fetchAndRender = () => {
    Promise.all([products, companies])
        .then(res => {
            const productData = res[0];
            const companyData = res[1];

            const page = window.location.hash.slice(1);

            console.log(page)

            if (page == 'products') {
                render(productData);
            }
            else if (page == 'companies') {
                render(companyData);
                console.log(companyData);
            }
            else {
                render(productData);
            }
        })
}

window.addEventListener('hashchange', fetchAndRender)

const render = (dataType) => {
    app.innerHTML = '';

    app.appendChild(headerContainer);

    const table = document.createElement('table')
    table.classList.add('table-dark')

    const tableBody = document.createElement('tbody')

    const tableHead = document.createElement('thead')

    const headRow = document.createElement('tr');

    tableHead.appendChild(headRow)
    table.appendChild(tableHead);
    table.appendChild(tableBody);

    if (dataType.length == 9) {
        
        productArray = ['ID','NAME','DESCRIPTION','SUGGESTEDPRICE','CREATEDAT','UPDATEDAT']
        secondProductArray = ['id', 'name', 'description', 'suggestedPrice', 'createdAt', 'updatedAt']


        for (let i = 0; i < 6; i++) {
            let th = document.createElement('th');
            th.innerText = productArray[i];
            headRow.appendChild(th);
        }

        dataType.forEach((obj) => {
            let row = document.createElement('tr');
            for (let i = 0; i < 6; i++) {
                let td = document.createElement('td');
                td.innerText = obj[secondProductArray[i]];
                row.appendChild(td);
            }
            tableBody.append(row);
        })
    }
    else {
                
        companyArray = ['ID','NAME','PHONE','STATE','CATCHPHRASE','CREATEDAT','UPDATEDAT']
        secondCompanyArray = ['id', 'name', 'phone', 'state', 'catchPhrase', 'createdAt', 'updatedAt']


        for (let i = 0; i < 7; i++) {
            let th = document.createElement('th');
            th.innerText = companyArray[i];
            headRow.appendChild(th);
        }

        dataType.forEach((obj) => {
            let row = document.createElement('tr');
            for (let i = 0; i < 7; i++) {
                let td = document.createElement('td');
                td.innerText = obj[secondCompanyArray[i]];
                row.appendChild(td);
            }
            tableBody.append(row);
        })
    }

    app.appendChild(table);
}


fetchAndRender();
