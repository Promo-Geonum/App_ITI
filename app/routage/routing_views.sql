--nearest vertex

SELECT
  v.id,
  v.the_geom
FROM
  edges_vertices_pgr AS v,
  edges AS e
WHERE
  v.id = (SELECT
            id
          FROM edges_vertices_pgr
          ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(%x%, %y%), 4326) LIMIT 1)
  AND (e.source = v.id OR e.target = v.id)
GROUP BY v.id, v.the_geom



--shortest path

SELECT
	MIN(a.seq) AS seq,  
        ST_Collect(b.geom)      
        FROM

        pgr_dijkstra ('
                 SELECT gid as id, source, target, distance AS cost FROM edges', %source%, %target%,
            FALSE) 
            a INNER JOIN edges b ON (a.edge = b.gid) ORDER BY seq
