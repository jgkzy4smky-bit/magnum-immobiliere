import { useEffect } from "react";
import "./App.css";

export default function App() {

  useEffect(() => {
    const items = document.querySelectorAll(".fade");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add("show");
          }
        });
      },
      {threshold:0.15}
    );

    items.forEach(item=>observer.observe(item));

  }, []);


  const projects = [
    {
      name:"Résidence SVJ",
      location:"Luxembourg",
      image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    },
    {
      name:"Villa Horizon",
      location:"Europe",
      image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    },
    {
      name:"Maison Signature",
      location:"Luxembourg",
      image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
    }
  ];


  return (

<div className="site">


<header>

<div className="logo">
MAGNUM.
</div>

<nav>
<a href="#projects">Réalisations</a>
<a href="#expertise">Expertise</a>
<a href="#contact">Contact</a>
</nav>

</header>



<section className="hero">

<div className="heroText fade">

<p>Promoteur immobilier de prestige</p>

<h1>
Redéfinir
<br/>
l'horizon.
</h1>

<button>
Découvrir
</button>

</div>

</section>




<section className="intro fade">

<span>NOTRE VISION</span>

<h2>
Créer des espaces
qui traversent le temps.
</h2>

<p>
MAGNUM imagine et développe des projets immobiliers
d'exception où architecture, design et qualité
se rencontrent.
</p>

</section>





<section id="projects">

<h2 className="fade">
Réalisations
</h2>


<div className="projects">

{
projects.map((project,index)=>(

<div className="card fade" key={index}>

<img src={project.image}/>

<div className="info">

<h3>
{project.name}
</h3>

<p>
{project.location}
</p>

</div>

</div>

))
}

</div>

</section>






<section id="expertise" className="expertise fade">

<h2>
Notre expertise
</h2>


<div className="grid">

<div>
<h3>Architecture</h3>
<p>
Des concepts pensés avec précision.
</p>
</div>


<div>
<h3>Développement</h3>
<p>
Une maîtrise complète du projet.
</p>
</div>


<div>
<h3>Excellence</h3>
<p>
Une attention absolue aux détails.
</p>
</div>


</div>


</section>





<section className="vision fade">

<h2>
L'art de créer des lieux uniques.
</h2>

<p>
Chaque projet raconte une histoire,
chaque détail construit une émotion.
</p>

</section>






<section id="contact" className="contact fade">

<h2>
Construisons votre prochain projet.
</h2>

<button>
Nous contacter
</button>


</section>




<footer>

<div className="logo">
MAGNUM.
</div>

<p>
Promoteur immobilier premium
</p>

</footer>



<style>{`

*{
margin:0;
padding:0;
box-sizing:border-box;
}


body{
background:#080808;
color:white;
font-family:Arial, Helvetica, sans-serif;
}


.site{
overflow:hidden;
}


header{

position:fixed;
top:0;
left:0;
width:100%;
padding:35px 8%;
display:flex;
justify-content:space-between;
z-index:10;

background:linear-gradient(
black,
transparent
);

}


.logo{

font-size:28px;
letter-spacing:5px;
font-weight:600;

}


nav{
display:flex;
gap:40px;
}


nav a{

color:white;
text-decoration:none;
font-size:15px;

}




.hero{

height:100vh;

display:flex;
align-items:center;

padding:8%;

background:

linear-gradient(
rgba(0,0,0,.45),
rgba(0,0,0,.75)
),

url("https://images.unsplash.com/photo-1600607688969-a5bfcd646154")
center/cover;

}



.heroText p{

font-size:18px;

}



h1{

font-size:clamp(60px,10vw,140px);
line-height:.9;
margin:35px 0;

}



button{

background:white;
color:black;
border:0;
padding:16px 40px;
font-size:16px;
cursor:pointer;

}





section{

padding:140px 8%;

}



h2{

font-size:clamp(40px,6vw,80px);
line-height:1;

}


.intro{

max-width:1100px;

}



.intro span{

color:#999;
letter-spacing:3px;

}


.intro p{

margin-top:40px;
font-size:25px;
color:#aaa;
line-height:1.6;

}




.projects{

display:grid;
grid-template-columns:repeat(3,1fr);
gap:30px;
margin-top:60px;

}



.card{

height:550px;
position:relative;
overflow:hidden;

}



.card img{

width:100%;
height:100%;
object-fit:cover;
transition:.7s;

}


.card:hover img{

transform:scale(1.05);

}



.info{

position:absolute;
bottom:0;
padding:30px;
background:linear-gradient(
transparent,
black
);
width:100%;

}





.grid{

display:grid;
grid-template-columns:repeat(3,1fr);
gap:40px;
margin-top:60px;

}


.grid p{

color:#aaa;
margin-top:15px;

}



.vision{

text-align:center;

}


.vision p{

font-size:25px;
color:#aaa;
margin-top:30px;

}




.contact{

text-align:center;

}



footer{

padding:60px 8%;
border-top:1px solid #222;

}





.fade{

opacity:0;
transform:translateY(40px);
transition:1s;

}


.show{

opacity:1;
transform:none;

}




@media(max-width:900px){

nav{
display:none;
}


.projects,
.grid{

grid-template-columns:1fr;

}


.hero{

padding-top:150px;

}


}

`}</style>


</div>

  );
}
