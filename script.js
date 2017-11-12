var Grid = [];


var sz = {};

var PercRoot = [];


var First = [];
var Last = [];

var Sites = [];
var OpenSites = 0;
var N = 0;

function Percolation(n)
{
    N = n;

    for (var i = 0; i < n; i++)
    {
        var arr = [];
        Grid.push(arr);

        $("body").append("<div id='" + i + "' ></div>");
        for (var j = 0; j < n; j++)
        {
            var a = [ i, j, 0];
            Sites.push(a);
            Grid[i].push(a);
            $("#" + i).append("<span class='square' id='square" + "row" + i + "column" + j + "'></span>");
        }
    }
}


//function ShowPath(rootPath)
//{
//    console.log("root path:", rootPath);
//    for (var i = 0; i < Grid.length; i++)
//    {
//        for (var j = 0; j < Grid[i].length; j++)
//        {
//            //console.log("grid[i][j]:", Grid[i][j]);
//            if (Grid[i][j][0] == rootPath[0] && Grid[i][j][1] == rootPath[1])
//            {
//                $("#square" + "row" + i + "column" + j).addClass("red");
//            }
//        }
//    }

    
//}


function Percolates()
{

    for (var i = 0; i < First.length; i++)
    {
        for (var j = 0; j < Last.length; j++)
        {
            if (Connected(First[i], Last[j]))
            {
                //console.log("first: ", Root(First[i]));
                //console.log("last: ", Root(Last[j]));

                //ShowPath(Root(Last[j]));
                return true;
            }
        }
     }

    return false;
}



function Open(row, column) {
    if (row == 0) {
        First.push(Grid[row][column]);
    }

    if (row == N - 1) {
        Last.push(Grid[row][column]);
    }
    $("#square" + "row" + row + "column" + column).addClass("blue");
    Grid[row][column][2] = 1;
    OpenSites += 1;
    var neighbs = GetNeighbors(Grid[row][column]);
    AddUnionToOpenNeighbors(neighbs, Grid[row][column]);

}
function IsOpen(row, column)
{
    return Grid[row][column][2] == 1;
}

function IsFull(row, column)
{
    return Grid[row][column][2] == 2;
}

function NumOpenSites()
{
    return OpenSites;
}

function Root(site)
{
    if ( site == Grid[site[0]][site[1]])
    {
        return site;
    }
    else
    {
        //Grid[site[0]][site[1]] = Grid[ Grid[site[0]][site[1]][0] ] [ Grid[site[0]][site[1]][1] ];

        return Root(Grid[site[0]][site[1]]);
    }
}

function Union(p, q)
{
     var j = Root(p);
     var i = Root(q);

     if (j in sz)
     {
         sz[j] += 1;
     }
     else
     {
         sz["j"] = 1;
     }


     if (i in sz)
     {
         sz[i] += 1;
     }
     else
     {
         sz[i] = 1;
     }
    

     if(sz[i] < sz[j])
     {
         Grid[i[0]][i[1]] = j;
     }
     else
     {
         Grid[j[0]][j[1]] = i;
     }
    



}

function IsOut( site)
{
    return (site.indexOf(-1) >= 0 || site.indexOf(N) >= 0);
}

function Connected(a, b)
{

    return Root(Grid[a[0]][a[1]]) == Root(Grid[b[0]][b[1]]);  
}

function GetNeighbors(site)
{
    var neighbors = [];
    neighbors = [];
    neighbors.push([ site[0] - 1, site[1] ]);
    neighbors.push([ site[0] + 1, site[1] ]);
    neighbors.push([ site[0], site[1] + 1 ]);
    neighbors.push([ site[0], site[1] - 1 ]);

    var neighborsNotOut = [];

    for(var i = 0; i < neighbors.length; i++)
    {
        if(!(IsOut(neighbors[i])))
        {
            neighborsNotOut.push(neighbors[i]);
        }

        
    }

    return neighborsNotOut;
}

function AddUnionToOpenNeighbors(sites, homeSite)
{
    
    for(var i = 0; i < sites.length; i++)
    {
        if (Grid[sites[i][0]][sites[i][1]][2] == 1)
        {
            Union(Grid[sites[i][0]][sites[i][1]], Grid[homeSite[0]][homeSite[1]] );
        }
    }
}


var  t 

Percolation(18);


var interv = setInterval(setOpenAnCheck, 10);


function setOpenAnCheck()
{
    var r = Math.floor(Math.random() * Sites.length);
    var a = Sites[r];

    Open(a[0], a[1]);
    Sites.splice(r, 1);

    if (Percolates())
    {
        clearInterval(interv);
    }
}

