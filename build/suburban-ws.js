;(() => {
  'use strict'
  var e = {
      476: function (e, t, r) {
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, o) {
                  void 0 === o && (o = r),
                    Object.defineProperty(e, o, {
                      enumerable: !0,
                      get: function () {
                        return t[r]
                      }
                    })
                }
              : function (e, t, r, o) {
                  void 0 === o && (o = r), (e[o] = t[r])
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t })
                }
              : function (e, t) {
                  e.default = t
                }),
          a =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e) for (var r in e) 'default' !== r && Object.prototype.hasOwnProperty.call(e, r) && o(t, e, r)
              return n(t, e), t
            },
          s =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e }
            }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const u = r(127),
          i = s(r(722)),
          d = r(275),
          c = r(386),
          l = s(r(976)),
          f = s(r(571)),
          p = a(r(53)),
          E = u.Router()
        E.use('/', p.default(f.default.headers, p.ValidationSource.HEADER), async (e, t, r) => {
          const o = e.get('Authorization'),
            [, n] = o.split(' ')
          try {
            i.default.verify(n, d.secretKey), (e.body.session = i.default.decode(n)), r()
          } catch (e) {
            return String(e).includes('invalid token') ? c.AuthFailureError(t, 'Token is not valid') : String(e).includes('jwt expired') ? c.AuthFailureError(t, 'Token is expired') : (l.default.error(e), c.AuthFailureError(t))
          }
        }),
          (t.default = E)
      },
      571: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = o(r(320)),
          a = r(53)
        t.default = { headers: n.default.object().keys({ authorization: a.JoiAuthBearer().required() }).unknown(!0) }
      },
      53: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.JoiAuthBearer = t.JoiAuthBasic = t.ValidationSource = void 0)
        const n = o(r(320)),
          a = r(633)
        var s
        !(function (e) {
          ;(e.BODY = 'body'), (e.HEADER = 'headers'), (e.QUERY = 'query'), (e.PARAM = 'params')
        })((s = t.ValidationSource || (t.ValidationSource = {}))),
          (t.JoiAuthBasic = () => n.default.string().custom((e, t) => (e.startsWith('Basic ') && '' !== e.split(' ')[1] ? e : t.error('any.invalid')), 'Authorization Header Validation')),
          (t.JoiAuthBearer = () => n.default.string().custom((e, t) => (e.startsWith('Bearer ') ? ('' === e.split(' ')[1] ? t.error('any.invalid') : e) : t.error('any.invalid')), 'Authorization Header Validation')),
          (t.default = (e, t = s.BODY) => (r, o, n) => {
            const { error: s } = e.validate(r[t])
            if (void 0 === s) return n()
            const { details: u } = s,
              i = u.map((e) => e.message.replace(/['"]+/g, '')).join(',')
            return a.BadRequestError(o, i)
          })
      },
      403: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = r(127),
          a = o(r(182)),
          s = n.Router()
        s.use('/orders', a.default), (t.default = s)
      },
      64: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.changeStatusOrder = t.createEncargo = void 0)
        const n = o(r(91)),
          a = r(633),
          s = r(609),
          u = n.default.getInstance()
        ;(t.createEncargo = async (e, t) => {
          const { status: r, idCreador: o, dataEncargo: n } = e.body
          try {
            const e = await u.createOrder(r, o, JSON.stringify(n))
            a.SuccessResponse(t, 'success', { data: { order: e } })
          } catch (e) {
            a.InternalError(t)
          }
        }),
          (t.changeStatusOrder = async (e, t) => {
            const { status: r, idRepartidor: o, motivo: n } = e.body,
              { id: i } = e.params
            switch (r) {
              case s.StatusService.ACEPTADO:
                try {
                  const e = await u.acceptOrder(Number(i), r, o)
                  a.SuccessResponse(t, 'success', { data: { order: e } })
                } catch (e) {
                  a.InternalError(t)
                }
                break
              case s.StatusService.CANCELADO:
                try {
                  const e = await u.finished(Number(i), r, n)
                  a.SuccessResponse(t, 'success', { data: { order: e } })
                } catch (e) {
                  a.InternalError(t)
                }
            }
          })
      },
      577: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = o(r(320))
        t.default = {
          create: n.default.object().keys({ idCreador: n.default.number().required(), status: n.default.number().required(), dataEncargo: n.default.object().required(), session: n.default.object().optional() }),
          changeStatusOrder: n.default.object().keys({ status: n.default.number().required(), idRepartidor: n.default.number().optional(), motivo: n.default.string().optional(), session: n.default.object().optional() })
        }
      },
      182: function (e, t, r) {
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, o) {
                  void 0 === o && (o = r),
                    Object.defineProperty(e, o, {
                      enumerable: !0,
                      get: function () {
                        return t[r]
                      }
                    })
                }
              : function (e, t, r, o) {
                  void 0 === o && (o = r), (e[o] = t[r])
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t })
                }
              : function (e, t) {
                  e.default = t
                }),
          a =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e) for (var r in e) 'default' !== r && Object.prototype.hasOwnProperty.call(e, r) && o(t, e, r)
              return n(t, e), t
            },
          s =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e }
            }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const u = r(127),
          i = s(r(53)),
          d = a(r(64)),
          c = s(r(577)),
          l = u.Router()
        l.post('/create', i.default(c.default.create), d.createEncargo), l.post('/:id', i.default(c.default.changeStatusOrder), d.changeStatusOrder), (t.default = l)
      },
      768: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = r(386),
          a = o(r(976)),
          s = o(r(801)).default.getInstance()
        t.default = async (e, t) => {
          try {
            const { correo: r, password: o } = e.body,
              a = await s.findByEmail(r)
            if (void 0 === a) return n.BadRequestError(t, 'User not register')
            if (void 0 === (await s.comparePassword(o, a.password))) return n.AuthFailureError(t)
            const u = { ...a }
            delete u.password
            const i = s.signToken(u)
            return n.SuccessResponse(t, 'Signup Successful', { data: { user: u, token: i } })
          } catch (e) {
            return a.default.error(e), n.InternalError(t)
          }
        }
      },
      530: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = o(r(320))
        t.default = {
          userCredential: n.default.object().keys({ usuario: n.default.string().required().min(3), clave: n.default.string().required().min(6) }),
          signup: n.default
            .object()
            .keys({
              nombre: n.default.string().required().min(3),
              apellido: n.default.string().required().min(3),
              celular: n.default.string().required(),
              correo: n.default.string().email().required(),
              password: n.default.string().required().min(6),
              imagen: n.default.string().required(),
              tipo: n.default.string().required()
            }),
          login: n.default.object().keys({ correo: n.default.string().email().required(), password: n.default.string().required().min(6) }),
          validateUser: n.default.object().keys({ usuario: n.default.string().required().min(3) })
        }
      },
      211: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.createUser = t.validateEmailUser = void 0)
        const n = r(386),
          a = o(r(976)),
          s = o(r(801)).default.getInstance()
        ;(t.validateEmailUser = async (e, t, r) => {
          try {
            const { correo: o } = e.body,
              a = await s.findByEmail(o)
            if ((console.log(a), void 0 !== a)) return n.BadRequestError(t, 'User already registered')
            r()
          } catch (e) {
            return a.default.error(e), n.InternalError(t)
          }
        }),
          (t.createUser = async (e, t) => {
            try {
              const r = e.body,
                { id: o } = await s.save(r)
              return n.SuccessResponse(t, 'Signup Successful', { data: { id: o } })
            } catch (e) {
              return a.default.error(e), n.InternalError(t)
            }
          })
      },
      199: function (e, t, r) {
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, o) {
                  void 0 === o && (o = r),
                    Object.defineProperty(e, o, {
                      enumerable: !0,
                      get: function () {
                        return t[r]
                      }
                    })
                }
              : function (e, t, r, o) {
                  void 0 === o && (o = r), (e[o] = t[r])
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t })
                }
              : function (e, t) {
                  e.default = t
                }),
          a =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e) for (var r in e) 'default' !== r && Object.prototype.hasOwnProperty.call(e, r) && o(t, e, r)
              return n(t, e), t
            },
          s =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e }
            }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const u = r(127),
          i = a(r(211)),
          d = s(r(768)),
          c = s(r(530)),
          l = s(r(53)),
          f = u.Router()
        f.post('/signup', l.default(c.default.signup), i.validateEmailUser, i.createUser), f.post('/login', l.default(c.default.login), d.default), (t.default = f)
      },
      255: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = r(127),
          a = o(r(199)),
          s = o(r(476)),
          u = o(r(403)),
          i = n.Router()
        i.use('/auth', a.default), i.use('/admin', s.default, u.default), (t.default = i)
      },
      165: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = o(r(127)),
          a = o(r(563)),
          s = o(r(605)),
          u = o(r(223)),
          i = r(275),
          d = o(r(976))
        ;(async function () {
          const e = n.default()
          e.use(n.default.static(`${__dirname}/public`)), await r(105).default({ expressApp: e })
          const t = s.default.createServer(e)
          u.default.getInstance().setIo(t),
            u.default.getInstance().hearSocket(),
            e
              .listen(i.port, () => {
                d.default.info(
                  `${a.default.yellow('########################################################')}\n🛡️  ${a.default.green(`Server ${a.default.blue(i.name)} listening on port:`)} ${a.default.blue(i.port)} 🛡️\n${a.default.yellow('########################################################')}`
                )
              })
              .on('error', (e) => d.default.error('error in server.listen', e))
        })()
          .then(() => d.default.info(a.default.green('done ✌️')))
          .catch((e) => d.default.error(a.default.red('error when starting the api'), e))
      },
      926: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.api = t.secretKey = t.corsUrl = t.db = t.fullChainHttps = t.keyHttps = t.name = t.port = t.environment = void 0),
          (t.environment = 'production'),
          (t.port = process.env.PORT ?? '9000'),
          (t.name = process.env.NAME_API ?? 'API'),
          (t.keyHttps = process.env.KEY_HTTPS ?? ''),
          (t.fullChainHttps = process.env.FULL_CHAIN_HTTPS ?? ''),
          (t.db = { database: process.env.PGDATABASE ?? 'postgres', host: process.env.PGHOST ?? 'database-1.ckxqesn1ftuj.us-east-1.rds.amazonaws.com', user: process.env.PGUSER ?? 'postgres_admin', password: process.env.PGPASSWORD ?? 'mv$B69Ck(VARp<L$', port: process.env.PORT ?? '5432' }),
          (t.corsUrl = process.env.CORS_URL),
          (t.secretKey = process.env.SECRETKEY ?? 'Jq60gQRdrY'),
          (t.api = { prefix: '/v1.0' })
      },
      633: (e, t) => {
        var r, o, n
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.responseError = t.InternalError = t.BadRequestError = t.AuthFailureError = t.NotFoundError = t.SuccessResponse = t.ResponseStatus = t.TypeErrors = t.StatusCode = void 0),
          (function (e) {
            ;(e.SUCCESS = '20000'), (e.FAILURE = '40001')
          })((r = t.StatusCode || (t.StatusCode = {}))),
          (function (e) {
            ;(e.TECNICO = 'Tecnico'), (e.NOTFOUND = 'Not Found'), (e.INTERNAL_ERROR = 'Internal error'), (e.BAD_REQUEST = 'Bad request'), (e.UNAUTHORIZED = 'Authentication error'), (e.ECONNREFUSED = 'ECONNREFUSED'), (e.ECONNABORTED = 'ECONNABORTED'), (e.ECONNRESET = 'ECONNRESET')
          })((o = t.TypeErrors || (t.TypeErrors = {}))),
          (function (e) {
            ;(e[(e.SUCCESS = 200)] = 'SUCCESS'), (e[(e.BAD_REQUEST = 400)] = 'BAD_REQUEST'), (e[(e.UNAUTHORIZED = 401)] = 'UNAUTHORIZED'), (e[(e.FORBIDDEN = 403)] = 'FORBIDDEN'), (e[(e.NOT_FOUND = 404)] = 'NOT_FOUND'), (e[(e.INTERNAL_ERROR = 500)] = 'INTERNAL_ERROR')
          })((n = t.ResponseStatus || (t.ResponseStatus = {}))),
          (t.SuccessResponse = (e, t = 'OK', o) => {
            const a = { message: t, StatusCode: r.SUCCESS }
            return void 0 !== o && Object.assign(a, o), e.status(n.SUCCESS).json(a)
          }),
          (t.NotFoundError = (e) => t.responseError(r.FAILURE, o.NOTFOUND, n.NOT_FOUND, e)),
          (t.AuthFailureError = (e, a = o.UNAUTHORIZED) => t.responseError(r.FAILURE, a, n.UNAUTHORIZED, e)),
          (t.BadRequestError = (e, a = o.BAD_REQUEST) => t.responseError(r.FAILURE, a, n.BAD_REQUEST, e)),
          (t.InternalError = (e) => t.responseError(r.FAILURE, o.INTERNAL_ERROR, 500, e)),
          (t.responseError = (e, t, r, o) => o.status(r).json({ statusCode: e, message: t }))
      },
      609: (e, t) => {
        var r
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.StatusService = void 0),
          ((r = t.StatusService || (t.StatusService = {}))[(r.CREADO = 1)] = 'CREADO'),
          (r[(r.ACEPTADO = 2)] = 'ACEPTADO'),
          (r[(r.CANCELADO = 3)] = 'CANCELADO'),
          (r[(r.ENPROCESO = 4)] = 'ENPROCESO'),
          (r[(r.TERMINADO = 5)] = 'TERMINADO')
      },
      364: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            info: (e = 'SUCCESS') => {
              console.log(e)
            },
            error: (e, t = '') => {
              console.log(`⚠️  ${e} ⚠️ `, t)
            }
          })
      },
      347: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.disconnect = t.connectClient = void 0),
          (t.connectClient = (e, t) => {
            console.log('Socket connected')
          }),
          (t.disconnect = (e, t) => {
            e.on('disconnect', () => {
              console.log('socket desconectado')
            })
          })
      },
      146: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = o(r(473)),
          a = o(r(150)),
          s = o(r(479)),
          u = r(926),
          i = o(r(255)),
          d = r(633)
        t.default = async ({ app: e }) => (
          e.use(s.default()),
          e.use(n.default.urlencoded({ limit: '10mb', extended: !0 })),
          e.use((e, t, r) => {
            n.default.json({
              verify: (e, t) => {
                e.rawBody = t.toString()
              }
            })(e, t, (e) => {
              if (void 0 !== e) {
                let r, o
                switch (e.type) {
                  case 'entity.parse.failed':
                    ;(r = 'entity.parse.failed'), (o = 400)
                    break
                  case 'entity.too.large':
                    ;(r = 'entity.too.large'), (o = 413)
                }
                return d.responseError(d.StatusCode.FAILURE, r, o, t)
              }
              r()
            })
          }),
          e.use(a.default('dev')),
          e.use(u.api.prefix, i.default),
          e
        )
      },
      105: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = o(r(563)),
          a = o(r(146)),
          s = o(r(364)),
          u = r(356)
        t.default = async ({ expressApp: e }) => {
          s.default.info(n.default.blue('Loading configuration... 💻'))
          try {
            await u.pool.connect(), s.default.info(n.default.green('PostgreSQL loaded and connected! ✌️'))
          } catch (e) {
            throw (s.default.error(n.default.red('error loading or connecting PostgreSQL'), e), e)
          }
          try {
            await a.default({ app: e }), s.default.info(n.default.green('Express loaded ✌️'))
          } catch (e) {
            throw (s.default.error(n.default.red('error loading Express'), e), e)
          }
        }
      },
      356: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.pool = void 0)
        const n = o(r(563)),
          a = r(723),
          s = r(926),
          u = o(r(364)),
          { user: i, password: d, host: c, database: l, port: f } = s.db,
          p = { user: i, password: d, host: c, database: l, port: +f, max: 5, idleTimeoutMillis: 4e4 }
        ;(t.pool = new a.Pool(p)),
          t.pool.on('connect', () => {}),
          t.pool.on('error', (e, t) => {
            let r
            ;(r += `${n.default.magenta('[  DB  ]')} *** CONEXIÓN INICIADA ERRADA POR:\n`), (r += `${n.default.magenta('[  DB  ]')} *** NOMBRE:\t${e.name}\n`), (r += `${n.default.magenta('[  DB  ]')} *** MENSAJE:\t${e.message}`)
            const o = e.stack
            throw (u.default.error(r, o), e)
          }),
          t.pool.on('remove', (e) => {
            const t = `[${n.default.blue(e.processID)}]${n.default.green('[  OPEN ]')} Conexion Client Pool Postgrest Finalizada.`
            u.default.info(`${n.default.magenta('[  DB  ]')} *** ${t}`)
          })
      },
      223: function (e, t, r) {
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, o) {
                  void 0 === o && (o = r),
                    Object.defineProperty(e, o, {
                      enumerable: !0,
                      get: function () {
                        return t[r]
                      }
                    })
                }
              : function (e, t, r, o) {
                  void 0 === o && (o = r), (e[o] = t[r])
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t })
                }
              : function (e, t) {
                  e.default = t
                }),
          a =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e) for (var r in e) 'default' !== r && Object.prototype.hasOwnProperty.call(e, r) && o(t, e, r)
              return n(t, e), t
            },
          s =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e }
            }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const u = r(395),
          i = s(r(364)),
          d = a(r(347)),
          c = s(r(563))
        t.default = class {
          constructor() {
            ;(this.setIo = (e) => {
              this.io = new u.Server(e, { cors: { origin: '*' } })
            }),
              (this.getIo = () => this.io),
              (this.hearSocket = () => {
                i.default.info(c.default.green('Escuchando la conexion del socketIO')),
                  this.io.on('connection', (e) => {
                    i.default.info(c.default.green('Un usuario connectado')), d.connectClient(e, this.io), d.disconnect(e, this.io)
                  })
              })
          }
          static getInstance() {
            return this.instance || (this.instance = new this())
          }
        }
      },
      275: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.api = t.secretKey = t.corsUrl = t.db = t.fullChainHttps = t.keyHttps = t.name = t.port = t.environment = void 0),
          (t.environment = 'production'),
          (t.port = process.env.PORT ?? '9000'),
          (t.name = process.env.NAME_API ?? 'API'),
          (t.keyHttps = process.env.KEY_HTTPS ?? ''),
          (t.fullChainHttps = process.env.FULL_CHAIN_HTTPS ?? ''),
          (t.db = { database: process.env.PGDATABASE ?? 'postgres', host: process.env.PGHOST ?? 'database-1.ckxqesn1ftuj.us-east-1.rds.amazonaws.com', user: process.env.PGUSER ?? 'postgres_admin', password: process.env.PGPASSWORD ?? 'mv$B69Ck(VARp<L$', port: process.env.PORT ?? '5432' }),
          (t.corsUrl = process.env.CORS_URL),
          (t.secretKey = process.env.SECRETKEY ?? 'Jq60gQRdrY'),
          (t.api = { prefix: '/v1.0' })
      },
      386: (e, t) => {
        var r, o, n
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.responseError = t.InternalError = t.BadRequestError = t.AuthFailureError = t.NotFoundError = t.SuccessResponse = t.ResponseStatus = t.TypeErrors = t.StatusCode = void 0),
          (function (e) {
            ;(e.SUCCESS = '20000'), (e.FAILURE = '40001')
          })((r = t.StatusCode || (t.StatusCode = {}))),
          (function (e) {
            ;(e.TECNICO = 'Tecnico'), (e.NOTFOUND = 'Not Found'), (e.INTERNAL_ERROR = 'Internal error'), (e.BAD_REQUEST = 'Bad request'), (e.UNAUTHORIZED = 'Authentication error'), (e.ECONNREFUSED = 'ECONNREFUSED'), (e.ECONNABORTED = 'ECONNABORTED'), (e.ECONNRESET = 'ECONNRESET')
          })((o = t.TypeErrors || (t.TypeErrors = {}))),
          (function (e) {
            ;(e[(e.SUCCESS = 200)] = 'SUCCESS'), (e[(e.BAD_REQUEST = 400)] = 'BAD_REQUEST'), (e[(e.UNAUTHORIZED = 401)] = 'UNAUTHORIZED'), (e[(e.FORBIDDEN = 403)] = 'FORBIDDEN'), (e[(e.NOT_FOUND = 404)] = 'NOT_FOUND'), (e[(e.INTERNAL_ERROR = 500)] = 'INTERNAL_ERROR')
          })((n = t.ResponseStatus || (t.ResponseStatus = {}))),
          (t.SuccessResponse = (e, t = 'OK', o) => {
            const a = { message: t, StatusCode: r.SUCCESS }
            return void 0 !== o && Object.assign(a, o), e.status(n.SUCCESS).json(a)
          }),
          (t.NotFoundError = (e) => t.responseError(r.FAILURE, o.NOTFOUND, n.NOT_FOUND, e)),
          (t.AuthFailureError = (e, a = o.UNAUTHORIZED) => t.responseError(r.FAILURE, a, n.UNAUTHORIZED, e)),
          (t.BadRequestError = (e, a = o.BAD_REQUEST) => t.responseError(r.FAILURE, a, n.BAD_REQUEST, e)),
          (t.InternalError = (e) => t.responseError(r.FAILURE, o.INTERNAL_ERROR, 500, e)),
          (t.responseError = (e, t, r, o) => o.status(r).json({ statusCode: e, message: t }))
      },
      976: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = {
            info: (e = 'SUCCESS') => {
              console.log(e)
            },
            error: (e, t = '') => {
              console.log(`⚠️  ${e} ⚠️ `, t)
            }
          })
      },
      827: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.pool = void 0)
        const n = o(r(563)),
          a = r(723),
          s = r(275),
          u = o(r(976)),
          { user: i, password: d, host: c, database: l, port: f } = s.db,
          p = { user: i, password: d, host: c, database: l, port: +f, max: 5, idleTimeoutMillis: 4e4 }
        ;(t.pool = new a.Pool(p)),
          t.pool.on('connect', () => {}),
          t.pool.on('error', (e, t) => {
            let r
            ;(r += `${n.default.magenta('[  DB  ]')} *** CONEXIÓN INICIADA ERRADA POR:\n`), (r += `${n.default.magenta('[  DB  ]')} *** NOMBRE:\t${e.name}\n`), (r += `${n.default.magenta('[  DB  ]')} *** MENSAJE:\t${e.message}`)
            const o = e.stack
            throw (u.default.error(r, o), e)
          }),
          t.pool.on('remove', (e) => {
            const t = `[${n.default.blue(e.processID)}]${n.default.green('[  OPEN ]')} Conexion Client Pool Postgrest Finalizada.`
            u.default.info(`${n.default.magenta('[  DB  ]')} *** ${t}`)
          })
      },
      89: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.save = t.findByEmail = void 0), (t.findByEmail = 'SELECT u.* FROM users u WHERE correo = $1'), (t.save = 'INSERT INTO users (nombre, apellido, imagen, correo, celular, password, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id')
      },
      559: function (e, t, r) {
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, o) {
                  void 0 === o && (o = r),
                    Object.defineProperty(e, o, {
                      enumerable: !0,
                      get: function () {
                        return t[r]
                      }
                    })
                }
              : function (e, t, r, o) {
                  void 0 === o && (o = r), (e[o] = t[r])
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t })
                }
              : function (e, t) {
                  e.default = t
                }),
          a =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e) for (var r in e) 'default' !== r && Object.prototype.hasOwnProperty.call(e, r) && o(t, e, r)
              return n(t, e), t
            }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const s = r(827),
          u = a(r(89))
        class i {
          constructor() {
            ;(this.findByEmail = async (e) => {
              const { rows: t } = await s.pool.query(u.findByEmail, [e])
              return t[0]
            }),
              (this.save = async ({ nombre: e, apellido: t, celular: r, password: o, correo: n, imagen: a, tipo: i }) => {
                const { rows: d } = await s.pool.query(u.save, [e, t, a, n, r, o, i])
                return console.log(d), d[0]
              })
          }
          static getInstance() {
            return i.instance || (i.instance = new i()), i.instance
          }
        }
        t.default = i
      },
      748: function (e, t, r) {
        var o =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, o) {
                  void 0 === o && (o = r),
                    Object.defineProperty(e, o, {
                      enumerable: !0,
                      get: function () {
                        return t[r]
                      }
                    })
                }
              : function (e, t, r, o) {
                  void 0 === o && (o = r), (e[o] = t[r])
                }),
          n =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', { enumerable: !0, value: t })
                }
              : function (e, t) {
                  e.default = t
                }),
          a =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e) for (var r in e) 'default' !== r && Object.prototype.hasOwnProperty.call(e, r) && o(t, e, r)
              return n(t, e), t
            }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const s = r(827),
          u = a(r(321))
        class i {
          constructor() {
            ;(this.createOrder = async (e, t, r) => {
              const { rows: o } = await s.pool.query(u.createOrder, [e, t, r])
              return o[0]
            }),
              (this.acceptOrder = async (e, t, r) => {
                const { rows: o } = await s.pool.query(u.changeStatus, [t, r, e])
                return o[0]
              }),
              (this.finished = async (e, t, r) => {
                const { rows: o } = await s.pool.query(u.declineOrder, [t, r, e])
                return o[0]
              })
          }
          static getInstance() {
            return i.instance || (i.instance = new i()), i.instance
          }
        }
        t.default = i
      },
      321: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.declineOrder = t.changeStatus = t.createOrder = void 0),
          (t.createOrder = 'INSERT INTO orders (status, idcreador, ordersdata) VALUES ($1, $2 ,$3) returning *'),
          (t.changeStatus = 'update orders set status = $1, idrepartidor = $2 where id = $3 returning status'),
          (t.declineOrder = 'update orders set status = $1, mensaje = $2 where id = $3 returning (status, mensaje)')
      },
      801: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = o(r(563)),
          a = o(r(722)),
          s = o(r(552)),
          u = r(275),
          i = o(r(559)),
          d = o(r(976)),
          c = i.default.getInstance()
        class l {
          constructor() {
            ;(this.findByEmail = async (e) => {
              try {
                return await c.findByEmail(e)
              } catch (e) {
                throw (d.default.error(n.default.red('Error UsersService findByEmail '), e), new Error('ERROR TECNICO'))
              }
            }),
              (this.save = async ({ nombre: e, apellido: t, celular: r, correo: o, password: a, imagen: u, tipo: i }) => {
                try {
                  const n = await s.default.hash(a, 10)
                  return await c.save({ nombre: e, apellido: t, celular: r, password: n, correo: o, imagen: u, tipo: i })
                } catch (e) {
                  throw (d.default.error(n.default.red('Error UsersService save '), e), new Error('ERROR TECNICO'))
                }
              }),
              (this.comparePassword = async (e, t) => {
                try {
                  return await s.default.compare(e, t)
                } catch (e) {
                  throw (d.default.error(n.default.red('Error comparePassword '), e), e)
                }
              }),
              (this.signToken = (e) => a.default.sign(e, u.secretKey, { expiresIn: '24h' })),
              (this.verifyToken = (e) => a.default.verify(e, u.secretKey))
          }
          static getInstance() {
            return void 0 === l.instance && (l.instance = new l()), l.instance
          }
        }
        t.default = l
      },
      91: function (e, t, r) {
        var o =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e }
          }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const n = o(r(563)),
          a = o(r(748)),
          s = o(r(976)),
          u = a.default.getInstance()
        class i {
          constructor() {
            ;(this.createOrder = async (e, t, r) => {
              try {
                return await u.createOrder(e, t, r)
              } catch (e) {
                throw (s.default.error(n.default.red('Error OrderService findByEmail '), e), new Error('ERROR TECNICO'))
              }
            }),
              (this.acceptOrder = async (e, t, r) => {
                try {
                  return await u.acceptOrder(e, t, r)
                } catch (e) {
                  throw (s.default.error(n.default.red('Error OrderService findByEmail '), e), new Error('ERROR TECNICO'))
                }
              }),
              (this.finished = async (e, t, r) => {
                try {
                  return await u.finished(e, t, r)
                } catch (e) {
                  throw (s.default.error(n.default.red('Error OrderService findByEmail '), e), new Error('ERROR TECNICO'))
                }
              })
          }
          static getInstance() {
            return void 0 === i.instance && (i.instance = new i()), i.instance
          }
        }
        t.default = i
      },
      552: (e) => {
        e.exports = require('bcrypt')
      },
      473: (e) => {
        e.exports = require('body-parser')
      },
      563: (e) => {
        e.exports = require('colors')
      },
      479: (e) => {
        e.exports = require('cors')
      },
      127: (e) => {
        e.exports = require('express')
      },
      605: (e) => {
        e.exports = require('http')
      },
      320: (e) => {
        e.exports = require('joi')
      },
      722: (e) => {
        e.exports = require('jsonwebtoken')
      },
      150: (e) => {
        e.exports = require('morgan')
      },
      723: (e) => {
        e.exports = require('pg')
      },
      395: (e) => {
        e.exports = require('socket.io')
      }
    },
    t = {}
  !(function r(o) {
    if (t[o]) return t[o].exports
    var n = (t[o] = { exports: {} })
    return e[o].call(n.exports, n, n.exports, r), n.exports
  })(165)
})()
