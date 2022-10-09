const express = require('express')

const mysql = require('mysql2')

var bodyParser = require('body-parser')
var app = express()

var con = mysql.createConnection({

    host:'localhost',
    user:'root',
    password: 'root',
    database:'agenda'

})

app.use(express.static('public'))

con.connect()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended:true
}))


app.post('/agregarTarea', (req, res)=>{

    let materia = req.body.materia
    let descripcion = req.body.descripcion
    let fecha = req.body.fecha

    con.query('insert into tarea (`materia`, `descripcion`, `fecha`) values("'+materia+'","'+descripcion+'","'+fecha+'")',(err,respuesta,fields)=>{

        if(err)return console.log("Error",err)
        
        return res.send('<link rel="stylesheet" href="css/style.css"><a href="index.html"><img src="regreso.png" alt=""></A><h1>Tarea registrada <br> '+materia+':' +descripcion+','+fecha+ '</h1>')
    })

})

app.post('/modificarTarea', (req, res)=>{

    let materia = req.body.materia
    let descripcion = req.body.descripcion
    let fecha = req.body.fecha
    let id = req.body.id

    con.query('update tarea set materia=("'+materia+'"),descripcion=("'+descripcion+'"), fecha=("'+fecha+'") where id=("'+id+'")',(err,respuesta,fields)=>{

        if(err)return console.log("Error",err)
        
        return res.send('<link rel="stylesheet" href="css/style.css"><a href="/getTarea"><img src="regreso.png" alt=""></A><h3>Tarea modificada</h3>')
    })

})

app.post('/eliminarTarea', (req, res)=>{

    let id = req.body.id

    con.query('delete from tarea where id=("'+id+'")',(err,respuesta,fields)=>{

        if(err)return console.log("Error",err)
        
        return res.send('<link rel="stylesheet" href="css/style.css"><a href="/getTarea"><img src="regreso.png" alt=""></A><h3>Tarea No.' +id+ ' eliminada </h3>')
    })

})

app.get('/getTarea',(req,res)=>{

    con.query('SELECT *FROM TAREA ORDER BY fecha ASC', (err, respuesta, field)=>{
    if(err)return console.log('ERROR:', err)

    var tareaHTML=``
    console.log(respuesta)
    respuesta.forEach(tarea =>{
            tareaHTML += `<link rel="stylesheet" href="css/style.css">
            <tbody class="u-table-alt-palette-1-light-3 u-table-body u-white u-table-body-1">
              <tr style="height: 36px;">
                <td class="u-table-cell"><input type="checkbox"> ${tarea.fecha}</td>
                <td class="u-table-cell"> ${tarea.id}</td>
                <td class="u-table-cell">${tarea.descripcion}</td>
                <td class="u-table-cell">${tarea.materia}</td>
              </tr>`
    
    
        })
    
    return res.send(`<link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="nicepage.css" media="screen">
    <link rel="stylesheet" href="Page-8.css" media="screen">
    <script class="u-script" type="text/javascript" src="jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="nicepage.js" defer=""></script>
    <meta name="generator" content="Nicepage 4.19.4, nicepage.com">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700|Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i">
    
    
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": ""
}</script>
    <meta name="theme-color" content="#ad60ee">
    <meta property="og:title" content="Page 8">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-xl-mode" data-lang="es">
  
    <section class="u-align-center u-clearfix u-custom-color-6 u-section-1" id="sec-0daa">
      <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
      
    <p>Agenda De Tareas<p>
        <div class="u-table u-table-responsive u-table-1">
        
          <table class="u-table-entity u-table-entity-1">
            <colgroup>
              <col width="28.07%">
              <col width="22.63%">
              <col width="30.84%">
              <col width="18.46%">
            </colgroup>
            <thead class="u-palette-1-light-2 u-table-header u-table-header-1">
              <tr style="height: 47px;">
                <th class="u-custom-color-5 u-table-cell u-table-cell-1">Fecha de entrega</th>
                <th class="u-custom-color-5 u-table-cell u-table-cell-2"> Order ID </th>
                <th class="u-custom-color-5 u-table-cell u-table-cell-3">Descripción</th>
                <th class="u-custom-color-5 u-table-cell u-table-cell-4">Materia</th>
                
              </tr>
            </thead>
            ${tareaHTML}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    

    <section class="u-align-center u-clearfix u-custom-color-6 u-
          <table class="u-table-entity u-table-entity-1">
            <thead class="u-palette-1-light-2 u-table-header u-table-header-1">
            <tr style="height: 47px;">
              <th class="u-custom-color-5 u-table-cell u-table-cell-1"><a href="index.html">
              <img src="regreso.png" alt=""></A>
              </th>  
            <tr style="height: 47px;">
              <th class="u-custom-color-5 u-table-cell u-table-cell-1"><a href="#modal1">
              <img src="editar.png" alt=""></A>
              </th>
              </tr>

              <tr style="height: 47px;">
              <th class="u-custom-color-5 u-table-cell u-table-cell-2"><a href="#modal2">
              <img src="basura.png" alt=""></A>
              </th> 

              
              </tr>
            </thead>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    
    <div id="modal1" class="modalmask">
    <div class="modalbox movedown">
        <a href="#close" title="Close" class="close">X</a>
        <center><h3>Editar Tarea</h3></center>
        <form action="/modificarTarea" method="post">
            <label>Id de la tarea a modificar</label>
            <input class="inputid" type="number" name="id">
            <br><br>
            <label>Materia</label>
            <input class="input"  type="text" name="materia">
            <br><br>
            <label>Descripción</label>
            <input class="input3"  type="text" name="descripcion">
            <br><br>
            <label>Fecha de entrega</label>
            <input class="input"  type="date" name="fecha">
            <br><br>
            <input class="input"  type="submit" value="Editar">
            <br> 
        </form>
    </div></div>
  

    <div id="modal2" class="modalmask">
    <div class="modalbox movedown">
        <a href="#close" title="Close" class="close">X</a>
        <center><h3>Eliminar Tarea</h3></center>
    <form action="/eliminarTarea" method="post">
        <label for="">Id de la tarea</label>
        <input class="inputid" type="number" name="id">
        <br><br>
        <input class="input" type="submit" value="Eliminar">
    </form>
</div>
    </div></div>
</body></html>`
        )
    })

})


app.listen(3000, ()=>{

    console.log("Servidor escuchando en el puerto 3000")

})