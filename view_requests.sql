--reqête de noeud
SELECT
  v.id,
  v.the_geom,
  string_agg(distinct(e.name),',') AS name
FROM
  ways_vertices_pgr AS v,
  ways AS e
WHERE
  v.id = (SELECT
            id
          FROM ways_vertices_pgr
          ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(%x%, %y%), 4326) LIMIT 1)
  AND (e.source = v.id OR e.target = v.id)
GROUP BY v.id, v.the_geom

--reqête de chemin
SELECT
	MIN(a.seq) AS seq,  
        sum(b.length_m) AS distance,
        ST_Collect(b.the_geom) AS geom       
        FROM

        pgr_dijkstra ('
                 SELECT gid as id, source, target, cost FROM ways', %source%, %target%,
            TRUE) 
            a INNER JOIN ways b ON (a.edge = b.gid) ORDER BY seq
