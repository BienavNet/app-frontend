
//clases
router.get("/horario/:horario", claseMethods.getClaseByHorario)  //👀 //docente o director
router.get("/salon/:salon", claseMethods.getClaseBySalon)  //👀 /docente o director


ventanas, {clase, comentario, horario x detallehorario}

/// comentarios
router.delete("/delete/docente/:cedula", comentarioMethods.deleteAllComentariosByDocente)
router.get("/docente/:cedula/salon/:salon", comentarioMethods.filterByDocAndSal)  //👀


//detalle_horario
router.get("/docente/:cedula", detalle_horarioMethods.getDetallesHorarioByDocente) //👀
router.get("/horario/:horario", detalle_horarioMethods.getDetallesHorariosByHorario) //👀

//horario
router.get("/:cedula", horarioMethods.getHorariosByDocente)  //👀

{ en la screen del horario hacemos el friltro del detalle_horario }


// docente
tokensMethods.isAuthorized(router, ["docente", "director"]);
router.get("/cedula/:cedula", docenteMethods.getDocenteIdByCedula); //👀, ya me traigo los datos del login!



//aplicar endpoint a notificacion