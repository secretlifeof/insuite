/* eslint-disable */
function p( a ) {
    throw a;
}
var r = void 0, v = !0, C = !1;
var sjcl = {cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: {corrupt: function( a ) {
    this.toString = function() {
        return`CORRUPT: ${  this.message}`;
    };
    this.message = a;
}, invalid: function( a ) {
    this.toString = function() {
        return`INVALID: ${  this.message}`;
    };
    this.message = a;
}, bug: function( a ) {
    this.toString = function() {
        return`BUG: ${  this.message}`;
    };
    this.message = a;
}, notReady: function( a ) {
    this.toString = function() {
        return`NOT READY: ${  this.message}`;
    };
    this.message = a;
}}};
"undefined" !== typeof module && module.exports && (module.exports = sjcl);
"function" === typeof define && define( [], function() {
    return sjcl;
} );
sjcl.cipher.aes = function( a ) {
    this.A[0][0][0] || this.J();
    var b, c, d, e, f = this.A[0][4], g = this.A[1];
    b = a.length;
    var h = 1;
    4 !== b && (6 !== b && 8 !== b) && p( new sjcl.exception.invalid( "invalid aes key size" ) );
    this.d = [d = a.slice( 0 ), e = []];
    for( a = b; a < 4 * b + 28; a++ ) {
        c = d[a - 1];
        if( 0 === a % b || 8 === b && 4 === a % b ) {
            c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255], 0 === a % b && (c = c << 8 ^ c >>> 24 ^ h << 24, h = h << 1 ^ 283 * (h >> 7));
        }
        d[a] = d[a - b] ^ c;
    }
    for( b = 0; a; b++, a-- ) {
        c = d[b & 3 ? a : a - 4], e[b] = 4 >= a || 4 > b ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c &
                                                                                                                                           255]];
    }
};
sjcl.cipher.aes.prototype = {encrypt: function( a ) {
    return ba( this, a, 0 );
}, decrypt: function( a ) {
    return ba( this, a, 1 );
}, A: [
    [
        [],
        [],
        [],
        [],
        []
    ],
    [
        [],
        [],
        [],
        [],
        []
    ]
], J: function() {
    var a = this.A[0], b = this.A[1], c = a[4], d = b[4], e, f, g, h = [], k = [], l, n, m, q;
    for( e = 0; 0x100 > e; e++ ) {
        k[(h[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
    }
    for( f = g = 0; !c[f]; f ^= l || 1, g = k[g] || 1 ) {
        m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
        m = m >> 8 ^ m & 255 ^ 99;
        c[f] = m;
        d[m] = f;
        n = h[e = h[l = h[f]]];
        q = 0x1010101 * n ^ 0x10001 * e ^ 0x101 * l ^ 0x1010100 * f;
        n = 0x101 * h[m] ^ 0x1010100 * m;
        for( e = 0; 4 > e; e++ ) {
            a[e][f] = n = n << 24 ^ n >>> 8, b[e][m] = q = q << 24 ^ q >>> 8;
        }
    }
    for( e =
         0; 5 > e; e++ ) {
        a[e] = a[e].slice( 0 ), b[e] = b[e].slice( 0 );
    }
}};
function ba( a, b, c ) {
    4 !== b.length && p( new sjcl.exception.invalid( "invalid aes block size" ) );
    var d = a.d[c], e = b[0] ^ d[0], f = b[c ? 3 : 1] ^ d[1], g = b[2] ^ d[2];
    b = b[c ? 1 : 3] ^ d[3];
    var h, k, l, n = d.length / 4 - 2, m, q = 4, t = [0, 0, 0, 0];
    h = a.A[c];
    a = h[0];
    var s = h[1], E = h[2], G = h[3], F = h[4];
    for( m = 0; m < n; m++ ) {
        h = a[e >>> 24] ^ s[f >> 16 & 255] ^ E[g >> 8 & 255] ^ G[b & 255] ^ d[q], k = a[f >>> 24] ^ s[g >> 16 & 255] ^ E[b >> 8 & 255] ^ G[e & 255] ^ d[q + 1], l = a[g >>> 24] ^ s[b >> 16 & 255] ^ E[e >> 8 & 255] ^ G[f & 255] ^ d[q + 2], b = a[b >>> 24] ^ s[e >> 16 & 255] ^ E[f >> 8 & 255] ^ G[g & 255] ^ d[q + 3], q += 4, e = h, f = k, g = l;
    }
    for( m = 0; 4 >
                m; m++ ) {
        t[c ? 3 & -m : m] = F[e >>> 24] << 24 ^ F[f >> 16 & 255] << 16 ^ F[g >> 8 & 255] << 8 ^ F[b & 255] ^ d[q++], h = e, e = f, f = g, g = b, b = h;
    }
    return t;
}
sjcl.bitArray = {bitSlice: function( a, b, c ) {
    a = sjcl.bitArray.ea( a.slice( b / 32 ), 32 - (b & 31) ).slice( 1 );
    return c === r ? a : sjcl.bitArray.clamp( a, c - b );
}, extract: function( a, b, c ) {
    var d = Math.floor( -b - c & 31 );
    return((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1;
}, concat: function( a, b ) {
    if( 0 === a.length || 0 === b.length ) {
        return a.concat( b );
    }
    var c = a[a.length - 1], d = sjcl.bitArray.getPartial( c );
    return 32 === d ? a.concat( b ) : sjcl.bitArray.ea( b, d, c | 0, a.slice( 0, a.length - 1 ) );
}, bitLength: function( a ) {
    var b = a.length;
    return 0 ===
           b ? 0 : 32 * (b - 1) + sjcl.bitArray.getPartial( a[b - 1] );
}, clamp: function( a, b ) {
    if( 32 * a.length < b ) {
        return a;
    }
    a = a.slice( 0, Math.ceil( b / 32 ) );
    var c = a.length;
    b &= 31;
    0 < c && b && (a[c - 1] = sjcl.bitArray.partial( b, a[c - 1] & 2147483648 >> b - 1, 1 ));
    return a;
}, partial: function( a, b, c ) {
    return 32 === a ? b : (c ? b | 0 : b << 32 - a) + 0x10000000000 * a;
}, getPartial: function( a ) {
    return Math.round( a / 0x10000000000 ) || 32;
}, equal: function( a, b ) {
    if( sjcl.bitArray.bitLength( a ) !== sjcl.bitArray.bitLength( b ) ) {
        return C;
    }
    var c = 0, d;
    for( d = 0; d < a.length; d++ ) {
        c |= a[d] ^ b[d];
    }
    return 0 ===
           c;
}, ea: function( a, b, c, d ) {
    var e;
    e = 0;
    for( d === r && (d = []); 32 <= b; b -= 32 ) {
        d.push( c ), c = 0;
    }
    if( 0 === b ) {
        return d.concat( a );
    }
    for( e = 0; e < a.length; e++ ) {
        d.push( c | a[e] >>> b ), c = a[e] << 32 - b;
    }
    e = a.length ? a[a.length - 1] : 0;
    a = sjcl.bitArray.getPartial( e );
    d.push( sjcl.bitArray.partial( b + a & 31, 32 < b + a ? c : d.pop(), 1 ) );
    return d;
}, o: function( a, b ) {
    return[a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]];
}, byteswapM: function( a ) {
    var b, c;
    for( b = 0; b < a.length; ++b ) {
        c = a[b], a[b] = c >>> 24 | c >>> 8 & 0xff00 | (c & 0xff00) << 8 | c << 24;
    }
    return a;
}};
sjcl.codec.utf8String = {fromBits: function( a ) {
    var b = "", c = sjcl.bitArray.bitLength( a ), d, e;
    for( d = 0; d < c / 8; d++ ) {
        0 === (d & 3) && (e = a[d / 4]), b += String.fromCharCode( e >>> 24 ), e <<= 8;
    }
    return decodeURIComponent( escape( b ) );
}, toBits: function( a ) {
    a = unescape( encodeURIComponent( a ) );
    var b = [], c, d = 0;
    for( c = 0; c < a.length; c++ ) {
        d = d << 8 | a.charCodeAt( c ), 3 === (c & 3) && (b.push( d ), d = 0);
    }
    c & 3 && b.push( sjcl.bitArray.partial( 8 * (c & 3), d ) );
    return b;
}};
sjcl.codec.hex = {fromBits: function( a ) {
    var b = "", c;
    for( c = 0; c < a.length; c++ ) {
        b += ((a[c] | 0) + 0xf00000000000).toString( 16 ).substr( 4 );
    }
    return b.substr( 0, sjcl.bitArray.bitLength( a ) / 4 );
}, toBits: function( a ) {
    var b, c = [], d;
    a = a.replace( /\s|0x/g, "" );
    d = a.length;
    a += "00000000";
    for( b = 0; b < a.length; b += 8 ) {
        c.push( parseInt( a.substr( b, 8 ), 16 ) ^ 0 );
    }
    return sjcl.bitArray.clamp( c, 4 * d );
}};
sjcl.codec.base32 = {D: "0123456789abcdefghjkmnpqrstvwxyz", BITS: 32, BASE: 5, REMAINING: 27, fromBits: function( a ) {
    var b = sjcl.codec.base32.BASE, c = sjcl.codec.base32.REMAINING, d = "", e, f = 0, g = sjcl.codec.base32.D, h = 0, k = sjcl.bitArray.bitLength( a );
    for( e = 0; d.length * b <= k; ) {
        d += g.charAt( (h ^ a[e] >>> f) >>> c ), f < b ? (h = a[e] << b - f, f += c, e++) : (h <<= b, f -= b);
    }
    return d;
}, toBits: function( a ) {
    var b = sjcl.codec.base32.BITS, c = sjcl.codec.base32.BASE, d = sjcl.codec.base32.REMAINING, e = [], f, g = 0, h = sjcl.codec.base32.D, k = 0, l;
    for( f = 0; f < a.length; f++ ) {
        l = h.indexOf( a.charAt( f ) ),
            0 > l && p( new sjcl.exception.invalid( "this isn't base32!" ) ), g > d ? (g -= d, e.push( k ^ l >>> g ), k = l << b - g) : (g += c, k ^= l << b - g);
    }
    g & 56 && e.push( sjcl.bitArray.partial( g & 56, k, 1 ) );
    return e;
}};
sjcl.codec.base64 = {D: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function( a, b, c ) {
    var d = "", e = 0, f = sjcl.codec.base64.D, g = 0, h = sjcl.bitArray.bitLength( a );
    c && (f = `${f.substr( 0, 62 )  }-_`);
    for( c = 0; 6 * d.length < h; ) {
        d += f.charAt( (g ^ a[c] >>> e) >>> 26 ), 6 > e ? (g = a[c] << 6 - e, e += 26, c++) : (g <<= 6, e -= 6);
    }
    for( ; d.length & 3 && !b; ) {
        d += "=";
    }
    return d;
}, toBits: function( a, b ) {
    a = a.replace( /\s|=/g, "" );
    var c = [], d, e = 0, f = sjcl.codec.base64.D, g = 0, h;
    b && (f = `${f.substr( 0, 62 )  }-_`);
    for( d = 0; d < a.length; d++ ) {
        h = f.indexOf( a.charAt( d ) ),
            0 > h && p( new sjcl.exception.invalid( "this isn't base64!" ) ), 26 < e ? (e -= 26, c.push( g ^ h >>> e ), g = h << 32 - e) : (e += 6, g ^= h << 32 - e);
    }
    e & 56 && c.push( sjcl.bitArray.partial( e & 56, g, 1 ) );
    return c;
}};
sjcl.codec.base64url = {fromBits: function( a ) {
    return sjcl.codec.base64.fromBits( a, 1, 1 );
}, toBits: function( a ) {
    return sjcl.codec.base64.toBits( a, 1 );
}};
sjcl.codec.bytes = {fromBits: function( a ) {
    var b = [], c = sjcl.bitArray.bitLength( a ), d, e;
    for( d = 0; d < c / 8; d++ ) {
        0 === (d & 3) && (e = a[d / 4]), b.push( e >>> 24 ), e <<= 8;
    }
    return b;
}, toBits: function( a ) {
    var b = [], c, d = 0;
    for( c = 0; c < a.length; c++ ) {
        d = d << 8 | a[c], 3 === (c & 3) && (b.push( d ), d = 0);
    }
    c & 3 && b.push( sjcl.bitArray.partial( 8 * (c & 3), d ) );
    return b;
}};
sjcl.hash.sha256 = function( a ) {
    this.d[0] || this.J();
    a ? (this.h = a.h.slice( 0 ), this.e = a.e.slice( 0 ), this.c = a.c) : this.reset();
};
sjcl.hash.sha256.hash = function( a ) {
    return(new sjcl.hash.sha256).update( a ).finalize();
};
sjcl.hash.sha256.prototype = {blockSize: 512, reset: function() {
    this.h = this.m.slice( 0 );
    this.e = [];
    this.c = 0;
    return this;
}, update: function( a ) {
    "string" === typeof a && (a = sjcl.codec.utf8String.toBits( a ));
    var b, c = this.e = sjcl.bitArray.concat( this.e, a );
    b = this.c;
    a = this.c = b + sjcl.bitArray.bitLength( a );
    for( b = 512 + b & -512; b <= a; b += 512 ) {
        this.k( c.splice( 0, 16 ) );
    }
    return this;
}, finalize: function() {
    var a, b = this.e, c = this.h, b = sjcl.bitArray.concat( b, [sjcl.bitArray.partial( 1, 1 )] );
    for( a = b.length + 2; a & 15; a++ ) {
        b.push( 0 );
    }
    b.push( Math.floor( this.c /
                        4294967296 ) );
    for( b.push( this.c | 0 ); b.length; ) {
        this.k( b.splice( 0, 16 ) );
    }
    this.reset();
    return c;
}, m: [], d: [], J: function() {
    function a( a ) {
        return 0x100000000 * (a - Math.floor( a )) | 0;
    }

    var b = 0, c = 2, d;
    a:for( ; 64 > b; c++ ) {
        for( d = 2; d * d <= c; d++ ) {
            if( 0 === c % d ) {
                continue a;
            }
        }
        8 > b && (this.m[b] = a( Math.pow( c, 0.5 ) ));
        this.d[b] = a( Math.pow( c, 1 / 3 ) );
        b++;
    }
}, k: function( a ) {
    var b, c, d = a.slice( 0 ), e = this.h, f = this.d, g = e[0], h = e[1], k = e[2], l = e[3], n = e[4], m = e[5], q = e[6], t = e[7];
    for( a = 0; 64 > a; a++ ) {
        16 > a ? b = d[a] : (b = d[a + 1 & 15], c = d[a + 14 & 15], b = d[a & 15] = (b >>> 7 ^ b >>> 18 ^ b >>> 3 ^
                                                                                     b << 25 ^ b << 14) + (c >>> 17 ^ c >>> 19 ^ c >>> 10 ^ c << 15 ^ c << 13) + d[a & 15] + d[a + 9 & 15] | 0), b = b + t + (n >>> 6 ^ n >>> 11 ^ n >>> 25 ^ n << 26 ^ n << 21 ^ n << 7) + (q ^ n & (m ^ q)) + f[a], t = q, q = m, m = n, n = l + b | 0, l = k, k = h, h = g, g = b + (h & k ^ l & (h ^ k)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
    }
    e[0] = e[0] + g | 0;
    e[1] = e[1] + h | 0;
    e[2] = e[2] + k | 0;
    e[3] = e[3] + l | 0;
    e[4] = e[4] + n | 0;
    e[5] = e[5] + m | 0;
    e[6] = e[6] + q | 0;
    e[7] = e[7] + t | 0;
}};
sjcl.hash.sha512 = function( a ) {
    this.d[0] || this.J();
    a ? (this.h = a.h.slice( 0 ), this.e = a.e.slice( 0 ), this.c = a.c) : this.reset();
};
sjcl.hash.sha512.hash = function( a ) {
    return(new sjcl.hash.sha512).update( a ).finalize();
};
sjcl.hash.sha512.prototype = {blockSize: 1024, reset: function() {
    this.h = this.m.slice( 0 );
    this.e = [];
    this.c = 0;
    return this;
}, update: function( a ) {
    "string" === typeof a && (a = sjcl.codec.utf8String.toBits( a ));
    var b, c = this.e = sjcl.bitArray.concat( this.e, a );
    b = this.c;
    a = this.c = b + sjcl.bitArray.bitLength( a );
    for( b = 1024 + b & -1024; b <= a; b += 1024 ) {
        this.k( c.splice( 0, 32 ) );
    }
    return this;
}, finalize: function() {
    var a, b = this.e, c = this.h, b = sjcl.bitArray.concat( b, [sjcl.bitArray.partial( 1, 1 )] );
    for( a = b.length + 4; a & 31; a++ ) {
        b.push( 0 );
    }
    b.push( 0 );
    b.push( 0 );
    b.push( Math.floor( this.c / 0x100000000 ) );
    for( b.push( this.c | 0 ); b.length; ) {
        this.k( b.splice( 0, 32 ) );
    }
    this.reset();
    return c;
}, m: [], ra: [12372232, 13281083, 9762859, 1914609, 15106769, 4090911, 4308331, 8266105], d: [], ta: [2666018, 15689165, 5061423, 9034684, 4764984, 380953, 1658779, 7176472, 197186, 7368638, 14987916, 16757986, 8096111, 1480369, 13046325, 6891156, 15813330, 5187043, 9229749, 11312229, 2818677, 10937475, 4324308, 1135541, 6741931, 11809296, 16458047, 15666916, 11046850, 698149, 229999, 945776, 13774844, 2541862, 12856045, 9810911, 11494366,
    7844520, 15576806, 8533307, 15795044, 4337665, 16291729, 5553712, 15684120, 6662416, 7413802, 12308920, 13816008, 4303699, 9366425, 10176680, 13195875, 4295371, 6546291, 11712675, 15708924, 1519456, 15772530, 6568428, 6495784, 8568297, 13007125, 7492395, 2515356, 12632583, 14740254, 7262584, 1535930, 13146278, 16321966, 1853211, 294276, 13051027, 13221564, 1051980, 4080310, 6651434, 14088940, 4675607], J: function() {
    function a( a ) {
        return 0x100000000 * (a - Math.floor( a )) | 0;
    }

    function b( a ) {
        return 0x10000000000 * (a - Math.floor( a )) & 255;
    }

    var c = 0, d = 2, e;
    a:for( ; 80 >
             c; d++ ) {
        for( e = 2; e * e <= d; e++ ) {
            if( 0 === d % e ) {
                continue a;
            }
        }
        8 > c && (this.m[2 * c] = a( Math.pow( d, 0.5 ) ), this.m[2 * c + 1] = b( Math.pow( d, 0.5 ) ) << 24 | this.ra[c]);
        this.d[2 * c] = a( Math.pow( d, 1 / 3 ) );
        this.d[2 * c + 1] = b( Math.pow( d, 1 / 3 ) ) << 24 | this.ta[c];
        c++;
    }
}, k: function( a ) {
    var b, c, d = a.slice( 0 ), e = this.h, f = this.d, g = e[0], h = e[1], k = e[2], l = e[3], n = e[4], m = e[5], q = e[6], t = e[7], s = e[8], E = e[9], G = e[10], F = e[11], ha = e[12], S = e[13], ia = e[14], T = e[15], y = g, w = h, J = k, H = l, K = n, I = m, Y = q, L = t, z = s, x = E, U = G, M = F, V = ha, N = S, Z = ia, O = T;
    for( a = 0; 80 > a; a++ ) {
        if( 16 > a ) {
            b = d[2 * a], c = d[2 * a +
                                1];
        } else {
            c = d[2 * (a - 15)];
            var u = d[2 * (a - 15) + 1];
            b = (u << 31 | c >>> 1) ^ (u << 24 | c >>> 8) ^ c >>> 7;
            var A = (c << 31 | u >>> 1) ^ (c << 24 | u >>> 8) ^ (c << 25 | u >>> 7);
            c = d[2 * (a - 2)];
            var B = d[2 * (a - 2) + 1], u = (B << 13 | c >>> 19) ^ (c << 3 | B >>> 29) ^ c >>> 6, B = (c << 13 | B >>> 19) ^ (B << 3 | c >>> 29) ^ (c << 26 | B >>> 6), $ = d[2 * (a - 7)], aa = d[2 * (a - 16)], P = d[2 * (a - 16) + 1];
            c = A + d[2 * (a - 7) + 1];
            b = b + $ + (c >>> 0 < A >>> 0 ? 1 : 0);
            c += B;
            b += u + (c >>> 0 < B >>> 0 ? 1 : 0);
            c += P;
            b += aa + (c >>> 0 < P >>> 0 ? 1 : 0);
        }
        d[2 * a] = b |= 0;
        d[2 * a + 1] = c |= 0;
        var $ = z & U ^ ~z & V, ja = x & M ^ ~x & N, B = y & J ^ y & K ^ J & K, na = w & H ^ w & I ^ H & I, aa = (w << 4 | y >>> 28) ^ (y << 30 | w >>> 2) ^ (y << 25 |
                                                                                                                                                              w >>> 7), P = (y << 4 | w >>> 28) ^ (w << 30 | y >>> 2) ^ (w << 25 | y >>> 7), oa = f[2 * a], ka = f[2 * a + 1], u = O + ((z << 18 | x >>> 14) ^ (z << 14 | x >>> 18) ^ (x << 23 | z >>> 9)), A = Z + ((x << 18 | z >>> 14) ^ (x << 14 | z >>> 18) ^ (z << 23 | x >>> 9)) + (u >>> 0 < O >>> 0 ? 1 : 0), u = u + ja, A = A + ($ + (u >>> 0 < ja >>> 0 ? 1 : 0)), u = u + ka, A = A + (oa + (u >>> 0 < ka >>> 0 ? 1 : 0)), u = u + c | 0, A = A + (b + (u >>> 0 < c >>> 0 ? 1 : 0));
        c = P + na;
        b = aa + B + (c >>> 0 < P >>> 0 ? 1 : 0);
        Z = V;
        O = N;
        V = U;
        N = M;
        U = z;
        M = x;
        x = L + u | 0;
        z = Y + A + (x >>> 0 < L >>> 0 ? 1 : 0) | 0;
        Y = K;
        L = I;
        K = J;
        I = H;
        J = y;
        H = w;
        w = u + c | 0;
        y = A + b + (w >>> 0 < u >>> 0 ? 1 : 0) | 0;
    }
    h = e[1] = h + w | 0;
    e[0] = g + y + (h >>> 0 < w >>> 0 ? 1 : 0) | 0;
    l = e[3] = l + H | 0;
    e[2] =
    k + J + (l >>> 0 < H >>> 0 ? 1 : 0) | 0;
    m = e[5] = m + I | 0;
    e[4] = n + K + (m >>> 0 < I >>> 0 ? 1 : 0) | 0;
    t = e[7] = t + L | 0;
    e[6] = q + Y + (t >>> 0 < L >>> 0 ? 1 : 0) | 0;
    E = e[9] = E + x | 0;
    e[8] = s + z + (E >>> 0 < x >>> 0 ? 1 : 0) | 0;
    F = e[11] = F + M | 0;
    e[10] = G + U + (F >>> 0 < M >>> 0 ? 1 : 0) | 0;
    S = e[13] = S + N | 0;
    e[12] = ha + V + (S >>> 0 < N >>> 0 ? 1 : 0) | 0;
    T = e[15] = T + O | 0;
    e[14] = ia + Z + (T >>> 0 < O >>> 0 ? 1 : 0) | 0;
}};
sjcl.hash.sha1 = function( a ) {
    a ? (this.h = a.h.slice( 0 ), this.e = a.e.slice( 0 ), this.c = a.c) : this.reset();
};
sjcl.hash.sha1.hash = function( a ) {
    return(new sjcl.hash.sha1).update( a ).finalize();
};
sjcl.hash.sha1.prototype = {blockSize: 512, reset: function() {
    this.h = this.m.slice( 0 );
    this.e = [];
    this.c = 0;
    return this;
}, update: function( a ) {
    "string" === typeof a && (a = sjcl.codec.utf8String.toBits( a ));
    var b, c = this.e = sjcl.bitArray.concat( this.e, a );
    b = this.c;
    a = this.c = b + sjcl.bitArray.bitLength( a );
    for( b = this.blockSize + b & -this.blockSize; b <= a; b += this.blockSize ) {
        this.k( c.splice( 0, 16 ) );
    }
    return this;
}, finalize: function() {
    var a, b = this.e, c = this.h, b = sjcl.bitArray.concat( b, [sjcl.bitArray.partial( 1, 1 )] );
    for( a = b.length + 2; a & 15; a++ ) {
        b.push( 0 );
    }
    b.push( Math.floor( this.c / 0x100000000 ) );
    for( b.push( this.c | 0 ); b.length; ) {
        this.k( b.splice( 0, 16 ) );
    }
    this.reset();
    return c;
}, m: [1732584193, 4023233417, 2562383102, 271733878, 3285377520], d: [1518500249, 1859775393, 2400959708, 3395469782], k: function( a ) {
    var b, c, d, e, f, g, h = a.slice( 0 ), k = this.h;
    c = k[0];
    d = k[1];
    e = k[2];
    f = k[3];
    g = k[4];
    for( a = 0; 79 >= a; a++ ) {
        16 <= a && (h[a] = (h[a - 3] ^ h[a - 8] ^ h[a - 14] ^ h[a - 16]) << 1 | (h[a - 3] ^ h[a - 8] ^ h[a - 14] ^ h[a - 16]) >>> 31), b = 19 >= a ? d & e | ~d & f : 39 >= a ? d ^ e ^ f : 59 >= a ? d & e | d & f | e & f : 79 >= a ? d ^ e ^ f : r, b = (c << 5 | c >>> 27) + b + g + h[a] + this.d[Math.floor( a /
                                                                                                                                                                                                                                                                                                                   20 )] | 0, g = f, f = e, e = d << 30 | d >>> 2, d = c, c = b;
    }
    k[0] = k[0] + c | 0;
    k[1] = k[1] + d | 0;
    k[2] = k[2] + e | 0;
    k[3] = k[3] + f | 0;
    k[4] = k[4] + g | 0;
}};
sjcl.mode.ccm = {name: "ccm", encrypt: function( a, b, c, d, e ) {
    var f, g = b.slice( 0 ), h = sjcl.bitArray, k = h.bitLength( c ) / 8, l = h.bitLength( g ) / 8;
    e = e || 64;
    d = d || [];
    7 > k && p( new sjcl.exception.invalid( "ccm: iv must be at least 7 bytes" ) );
    for( f = 2; 4 > f && l >>> 8 * f; f++ ) {
        
    }
    f < 15 - k && (f = 15 - k);
    c = h.clamp( c, 8 * (15 - f) );
    b = sjcl.mode.ccm.Y( a, b, c, d, e, f );
    g = sjcl.mode.ccm.F( a, g, c, b, e, f );
    return h.concat( g.data, g.tag );
}, decrypt: function( a, b, c, d, e ) {
    e = e || 64;
    d = d || [];
    var f = sjcl.bitArray, g = f.bitLength( c ) / 8, h = f.bitLength( b ), k = f.clamp( b, h - e ), l = f.bitSlice( b,
        h - e ), h = (h - e) / 8;
    7 > g && p( new sjcl.exception.invalid( "ccm: iv must be at least 7 bytes" ) );
    for( b = 2; 4 > b && h >>> 8 * b; b++ ) {
        
    }
    b < 15 - g && (b = 15 - g);
    c = f.clamp( c, 8 * (15 - b) );
    k = sjcl.mode.ccm.F( a, k, c, l, e, b );
    a = sjcl.mode.ccm.Y( a, k.data, c, d, e, b );
    f.equal( k.tag, a ) || p( new sjcl.exception.corrupt( "ccm: tag doesn't match" ) );
    return k.data;
}, Y: function( a, b, c, d, e, f ) {
    var g = [], h = sjcl.bitArray, k = h.o;
    e /= 8;
    (e % 2 || 4 > e || 16 < e) && p( new sjcl.exception.invalid( "ccm: invalid tag length" ) );
    (0xffffffff < d.length || 0xffffffff < b.length) && p( new sjcl.exception.bug( "ccm: can't deal with 4GiB or more data" ) );
    f = [h.partial( 8, (d.length ? 64 : 0) | e - 2 << 2 | f - 1 )];
    f = h.concat( f, c );
    f[3] |= h.bitLength( b ) / 8;
    f = a.encrypt( f );
    if( d.length ) {
        c = h.bitLength( d ) / 8;
        65279 >= c ? g = [h.partial( 16, c )] : 0xffffffff >= c && (g = h.concat( [h.partial( 16, 65534 )], [c] ));
        g = h.concat( g, d );
        for( d = 0; d < g.length; d += 4 ) {
            f = a.encrypt( k( f, g.slice( d, d + 4 ).concat( [0, 0, 0] ) ) );
        }
    }
    for( d = 0; d < b.length; d += 4 ) {
        f = a.encrypt( k( f, b.slice( d, d + 4 ).concat( [0, 0, 0] ) ) );
    }
    return h.clamp( f, 8 * e );
}, F: function( a, b, c, d, e, f ) {
    var g, h = sjcl.bitArray;
    g = h.o;
    var k = b.length, l = h.bitLength( b );
    c = h.concat( [h.partial( 8,
        f - 1 )], c ).concat( [0, 0, 0] ).slice( 0, 4 );
    d = h.bitSlice( g( d, a.encrypt( c ) ), 0, e );
    if( !k ) {
        return{tag: d, data: []};
    }
    for( g = 0; g < k; g += 4 ) {
        c[3]++, e = a.encrypt( c ), b[g] ^= e[0], b[g + 1] ^= e[1], b[g + 2] ^= e[2], b[g + 3] ^= e[3];
    }
    return{tag: d, data: h.clamp( b, l )};
}};
sjcl.beware === r && (sjcl.beware = {});
sjcl.beware["CBC mode is dangerous because it doesn't protect message integrity."] = function() {
    sjcl.mode.cbc = {name: "cbc", encrypt: function( a, b, c, d ) {
        d && d.length && p( new sjcl.exception.invalid( "cbc can't authenticate data" ) );
        128 !== sjcl.bitArray.bitLength( c ) && p( new sjcl.exception.invalid( "cbc iv must be 128 bits" ) );
        var e = sjcl.bitArray, f = e.o, g = e.bitLength( b ), h = 0, k = [];
        g & 7 && p( new sjcl.exception.invalid( "pkcs#5 padding only works for multiples of a byte" ) );
        for( d = 0; h + 128 <= g; d += 4, h += 128 ) {
            c = a.encrypt( f( c, b.slice( d,
                d + 4 ) ) ), k.splice( d, 0, c[0], c[1], c[2], c[3] );
        }
        g = 0x1010101 * (16 - (g >> 3 & 15));
        c = a.encrypt( f( c, e.concat( b, [g, g, g, g] ).slice( d, d + 4 ) ) );
        k.splice( d, 0, c[0], c[1], c[2], c[3] );
        return k;
    }, decrypt: function( a, b, c, d ) {
        d && d.length && p( new sjcl.exception.invalid( "cbc can't authenticate data" ) );
        128 !== sjcl.bitArray.bitLength( c ) && p( new sjcl.exception.invalid( "cbc iv must be 128 bits" ) );
        (sjcl.bitArray.bitLength( b ) & 127 || !b.length) && p( new sjcl.exception.corrupt( "cbc ciphertext must be a positive multiple of the block size" ) );
        var e = sjcl.bitArray,
            f = e.o, g, h = [];
        for( d = 0; d < b.length; d += 4 ) {
            g = b.slice( d, d + 4 ), c = f( c, a.decrypt( g ) ), h.splice( d, 0, c[0], c[1], c[2], c[3] ), c = g;
        }
        g = h[d - 1] & 255;
        (0 === g || 16 < g) && p( new sjcl.exception.corrupt( "pkcs#5 padding corrupt" ) );
        c = 0x1010101 * g;
        e.equal( e.bitSlice( [c, c, c, c], 0, 8 * g ), e.bitSlice( h, 32 * h.length - 8 * g, 32 * h.length ) ) || p( new sjcl.exception.corrupt( "pkcs#5 padding corrupt" ) );
        return e.bitSlice( h, 0, 32 * h.length - 8 * g );
    }};
};
sjcl.mode.ocb2 = {name: "ocb2", encrypt: function( a, b, c, d, e, f ) {
    128 !== sjcl.bitArray.bitLength( c ) && p( new sjcl.exception.invalid( "ocb iv must be 128 bits" ) );
    var g, h = sjcl.mode.ocb2.V, k = sjcl.bitArray, l = k.o, n = [0, 0, 0, 0];
    c = h( a.encrypt( c ) );
    var m, q = [];
    d = d || [];
    e = e || 64;
    for( g = 0; g + 4 < b.length; g += 4 ) {
        m = b.slice( g, g + 4 ), n = l( n, m ), q = q.concat( l( c, a.encrypt( l( c, m ) ) ) ), c = h( c );
    }
    m = b.slice( g );
    b = k.bitLength( m );
    g = a.encrypt( l( c, [0, 0, 0, b] ) );
    m = k.clamp( l( m.concat( [0, 0, 0] ), g ), b );
    n = l( n, l( m.concat( [0, 0, 0] ), g ) );
    n = a.encrypt( l( n, l( c, h( c ) ) ) );
    d.length &&
    (n = l( n, f ? d : sjcl.mode.ocb2.pmac( a, d ) ));
    return q.concat( k.concat( m, k.clamp( n, e ) ) );
}, decrypt: function( a, b, c, d, e, f ) {
    128 !== sjcl.bitArray.bitLength( c ) && p( new sjcl.exception.invalid( "ocb iv must be 128 bits" ) );
    e = e || 64;
    var g = sjcl.mode.ocb2.V, h = sjcl.bitArray, k = h.o, l = [0, 0, 0, 0], n = g( a.encrypt( c ) ), m, q, t = sjcl.bitArray.bitLength( b ) - e, s = [];
    d = d || [];
    for( c = 0; c + 4 < t / 32; c += 4 ) {
        m = k( n, a.decrypt( k( n, b.slice( c, c + 4 ) ) ) ), l = k( l, m ), s = s.concat( m ), n = g( n );
    }
    q = t - 32 * c;
    m = a.encrypt( k( n, [0, 0, 0, q] ) );
    m = k( m, h.clamp( b.slice( c ), q ).concat( [0, 0, 0] ) );
    l = k( l, m );
    l = a.encrypt( k( l, k( n, g( n ) ) ) );
    d.length && (l = k( l, f ? d : sjcl.mode.ocb2.pmac( a, d ) ));
    h.equal( h.clamp( l, e ), h.bitSlice( b, t ) ) || p( new sjcl.exception.corrupt( "ocb: tag doesn't match" ) );
    return s.concat( h.clamp( m, q ) );
}, pmac: function( a, b ) {
    var c, d = sjcl.mode.ocb2.V, e = sjcl.bitArray, f = e.o, g = [0, 0, 0, 0], h = a.encrypt( [0, 0, 0, 0] ), h = f( h, d( d( h ) ) );
    for( c = 0; c + 4 < b.length; c += 4 ) {
        h = d( h ), g = f( g, a.encrypt( f( h, b.slice( c, c + 4 ) ) ) );
    }
    c = b.slice( c );
    128 > e.bitLength( c ) && (h = f( h, d( h ) ), c = e.concat( c, [-2147483648, 0, 0, 0] ));
    g = f( g, c );
    return a.encrypt( f( d( f( h,
        d( h ) ) ), g ) );
}, V: function( a ) {
    return[a[0] << 1 ^ a[1] >>> 31, a[1] << 1 ^ a[2] >>> 31, a[2] << 1 ^ a[3] >>> 31, a[3] << 1 ^ 135 * (a[0] >>> 31)];
}};
sjcl.mode.gcm = {name: "gcm", encrypt: function( a, b, c, d, e ) {
    var f = b.slice( 0 );
    b = sjcl.bitArray;
    d = d || [];
    a = sjcl.mode.gcm.F( v, a, f, d, c, e || 128 );
    return b.concat( a.data, a.tag );
}, decrypt: function( a, b, c, d, e ) {
    var f = b.slice( 0 ), g = sjcl.bitArray, h = g.bitLength( f );
    e = e || 128;
    d = d || [];
    e <= h ? (b = g.bitSlice( f, h - e ), f = g.bitSlice( f, 0, h - e )) : (b = f, f = []);
    a = sjcl.mode.gcm.F( C, a, f, d, c, e );
    g.equal( a.tag, b ) || p( new sjcl.exception.corrupt( "gcm: tag doesn't match" ) );
    return a.data;
}, pa: function( a, b ) {
    var c, d, e, f, g, h = sjcl.bitArray.o;
    e = [0, 0, 0, 0];
    f = b.slice( 0 );
    for( c = 0; 128 > c; c++ ) {
        (d = 0 !== (a[Math.floor( c / 32 )] & 1 << 31 - c % 32)) && (e = h( e, f ));
        g = 0 !== (f[3] & 1);
        for( d = 3; 0 < d; d-- ) {
            f[d] = f[d] >>> 1 | (f[d - 1] & 1) << 31;
        }
        f[0] >>>= 1;
        g && (f[0] ^= -0x1f000000);
    }
    return e;
}, t: function( a, b, c ) {
    var d, e = c.length;
    b = b.slice( 0 );
    for( d = 0; d < e; d += 4 ) {
        b[0] ^= 0xffffffff & c[d], b[1] ^= 0xffffffff & c[d + 1], b[2] ^= 0xffffffff & c[d + 2], b[3] ^= 0xffffffff & c[d + 3], b = sjcl.mode.gcm.pa( b, a );
    }
    return b;
}, F: function( a, b, c, d, e, f ) {
    var g, h, k, l, n, m, q, t, s = sjcl.bitArray;
    m = c.length;
    q = s.bitLength( c );
    t = s.bitLength( d );
    h = s.bitLength( e );
    g = b.encrypt( [0,
        0, 0, 0] );
    96 === h ? (e = e.slice( 0 ), e = s.concat( e, [1] )) : (e = sjcl.mode.gcm.t( g, [0, 0, 0, 0], e ), e = sjcl.mode.gcm.t( g, e, [0, 0, Math.floor( h / 0x100000000 ), h & 0xffffffff] ));
    h = sjcl.mode.gcm.t( g, [0, 0, 0, 0], d );
    n = e.slice( 0 );
    d = h.slice( 0 );
    a || (d = sjcl.mode.gcm.t( g, h, c ));
    for( l = 0; l < m; l += 4 ) {
        n[3]++, k = b.encrypt( n ), c[l] ^= k[0], c[l + 1] ^= k[1], c[l + 2] ^= k[2], c[l + 3] ^= k[3];
    }
    c = s.clamp( c, q );
    a && (d = sjcl.mode.gcm.t( g, h, c ));
    a = [Math.floor( t / 0x100000000 ), t & 0xffffffff, Math.floor( q / 0x100000000 ), q & 0xffffffff];
    d = sjcl.mode.gcm.t( g, d, a );
    k = b.encrypt( e );
    d[0] ^= k[0];
    d[1] ^= k[1];
    d[2] ^= k[2];
    d[3] ^= k[3];
    return{tag: s.bitSlice( d, 0, f ), data: c};
}};
sjcl.misc.hmac = function( a, b ) {
    this.$ = b = b || sjcl.hash.sha256;
    var c = [
        [],
        []
    ], d, e = b.prototype.blockSize / 32;
    this.C = [new b, new b];
    a.length > e && (a = b.hash( a ));
    for( d = 0; d < e; d++ ) {
        c[0][d] = a[d] ^ 909522486, c[1][d] = a[d] ^ 1549556828;
    }
    this.C[0].update( c[0] );
    this.C[1].update( c[1] );
    this.U = new b( this.C[0] );
};
sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function( a ) {
    this.ga && p( new sjcl.exception.invalid( "encrypt on already updated hmac called!" ) );
    this.update( a );
    return this.digest( a );
};
sjcl.misc.hmac.prototype.reset = function() {
    this.U = new this.$( this.C[0] );
    this.ga = C;
};
sjcl.misc.hmac.prototype.update = function( a ) {
    this.ga = v;
    this.U.update( a );
};
sjcl.misc.hmac.prototype.digest = function() {
    var a = this.U.finalize(), a = (new this.$( this.C[1] )).update( a ).finalize();
    this.reset();
    return a;
};
sjcl.misc.pbkdf2 = function( a, b, c, d, e ) {
    c = c || 1E3;
    (0 > d || 0 > c) && p( sjcl.exception.invalid( "invalid params to pbkdf2" ) );
    "string" === typeof a && (a = sjcl.codec.utf8String.toBits( a ));
    "string" === typeof b && (b = sjcl.codec.utf8String.toBits( b ));
    e = e || sjcl.misc.hmac;
    a = new e( a );
    var f, g, h, k, l = [], n = sjcl.bitArray;
    for( k = 1; 32 * l.length < (d || 1); k++ ) {
        e = f = a.encrypt( n.concat( b, [k] ) );
        for( g = 1; g < c; g++ ) {
            f = a.encrypt( f );
            for( h = 0; h < f.length; h++ ) {
                e[h] ^= f[h];
            }
        }
        l = l.concat( e );
    }
    d && (l = n.clamp( l, d ));
    return l;
};
sjcl.prng = function( a ) {
    this.j = [new sjcl.hash.sha256];
    this.u = [0];
    this.T = 0;
    this.L = {};
    this.S = 0;
    this.X = {};
    this.da = this.n = this.w = this.ma = 0;
    this.d = [0, 0, 0, 0, 0, 0, 0, 0];
    this.q = [0, 0, 0, 0];
    this.Q = r;
    this.R = a;
    this.K = C;
    this.P = {progress: {}, seeded: {}};
    this.B = this.la = 0;
    this.M = 1;
    this.O = 2;
    this.ia = 0x10000;
    this.W = [0, 48, 64, 96, 128, 192, 0x100, 384, 512, 768, 1024];
    this.ja = 3E4;
    this.ha = 80;
};
sjcl.prng.prototype = {randomWords: function( a, b ) {
    var c = [], d;
    d = this.isReady( b );
    var e;
    d === this.B && p( new sjcl.exception.notReady( "generator isn't seeded" ) );
    if( d & this.O ) {
        d = !(d & this.M);
        e = [];
        var f = 0, g;
        this.da = e[0] = (new Date).valueOf() + this.ja;
        for( g = 0; 16 > g; g++ ) {
            e.push( 0x100000000 * Math.random() | 0 );
        }
        for( g = 0; g < this.j.length && !(e = e.concat( this.j[g].finalize() ), f += this.u[g], this.u[g] = 0, !d && this.T & 1 << g); g++ ) {
            
        }
        this.T >= 1 << this.j.length && (this.j.push( new sjcl.hash.sha256 ), this.u.push( 0 ));
        this.n -= f;
        f > this.w && (this.w = f);
        this.T++;
        this.d = sjcl.hash.sha256.hash( this.d.concat( e ) );
        this.Q = new sjcl.cipher.aes( this.d );
        for( d = 0; 4 > d && !(this.q[d] = this.q[d] + 1 | 0, this.q[d]); d++ ) {
            
        }
    }
    for( d = 0; d < a; d += 4 ) {
        0 === (d + 1) % this.ia && ca( this ), e = da( this ), c.push( e[0], e[1], e[2], e[3] );
    }
    ca( this );
    return c.slice( 0, a );
}, setDefaultParanoia: function( a, b ) {
    0 === a && "Setting paranoia=0 will ruin your security; use it only for testing" !== b && p( "Setting paranoia=0 will ruin your security; use it only for testing" );
    this.R = a;
}, addEntropy: function( a, b, c ) {
    c = c || "user";
    var d,
        e, f = (new Date).valueOf(), g = this.L[c], h = this.isReady(), k = 0;
    d = this.X[c];
    d === r && (d = this.X[c] = this.ma++);
    g === r && (g = this.L[c] = 0);
    this.L[c] = (this.L[c] + 1) % this.j.length;
    switch( typeof a ) {
        case "number":
            b === r && (b = 1);
            this.j[g].update( [d, this.S++, 1, b, f, 1, a | 0] );
            break;
        case "object":
            c = Object.prototype.toString.call( a );
            if( "[object Uint32Array]" === c ) {
                e = [];
                for( c = 0; c < a.length; c++ ) {
                    e.push( a[c] );
                }
                a = e;
            } else {
                "[object Array]" !== c && (k = 1);
                for( c = 0; c < a.length && !k; c++ ) {
                    "number" !== typeof a[c] && (k = 1);
                }
            }
            if( !k ) {
                if( b === r ) {
                    for( c = b = 0; c < a.length; c++ ) {
                        for( e =
                             a[c]; 0 < e; ) {
                            b++, e >>>= 1;
                        }
                    }
                }
                this.j[g].update( [d, this.S++, 2, b, f, a.length].concat( a ) );
            }
            break;
        case "string":
            b === r && (b = a.length);
            this.j[g].update( [d, this.S++, 3, b, f, a.length] );
            this.j[g].update( a );
            break;
        default:
            k = 1;
    }
    k && p( new sjcl.exception.bug( "random: addEntropy only supports number, array of numbers or string" ) );
    this.u[g] += b;
    this.n += b;
    h === this.B && (this.isReady() !== this.B && ea( "seeded", Math.max( this.w, this.n ) ), ea( "progress", this.getProgress() ));
}, isReady: function( a ) {
    a = this.W[a !== r ? a : this.R];
    return this.w && this.w >=
                     a ? this.u[0] > this.ha && (new Date).valueOf() > this.da ? this.O | this.M : this.M : this.n >= a ? this.O | this.B : this.B;
}, getProgress: function( a ) {
    a = this.W[a ? a : this.R];
    return this.w >= a ? 1 : this.n > a ? 1 : this.n / a;
}, startCollectors: function() {
    this.K || (this.f = {loadTimeCollector: D( this, this.ua ), mouseCollector: D( this, this.va ), keyboardCollector: D( this, this.sa ), accelerometerCollector: D( this, this.ka ), touchCollector: D( this, this.xa )}, window.addEventListener ? (window.addEventListener( "load", this.f.loadTimeCollector, C ), window.addEventListener( "mousemove",
        this.f.mouseCollector, C ), window.addEventListener( "keypress", this.f.keyboardCollector, C ), window.addEventListener( "devicemotion", this.f.accelerometerCollector, C ), window.addEventListener( "touchmove", this.f.touchCollector, C )) : document.attachEvent ? (document.attachEvent( "onload", this.f.loadTimeCollector ), document.attachEvent( "onmousemove", this.f.mouseCollector ), document.attachEvent( "keypress", this.f.keyboardCollector )) : p( new sjcl.exception.bug( "can't attach event" ) ), this.K = v);
}, stopCollectors: function() {
    this.K &&
    (window.removeEventListener ? (window.removeEventListener( "load", this.f.loadTimeCollector, C ), window.removeEventListener( "mousemove", this.f.mouseCollector, C ), window.removeEventListener( "keypress", this.f.keyboardCollector, C ), window.removeEventListener( "devicemotion", this.f.accelerometerCollector, C ), window.removeEventListener( "touchmove", this.f.touchCollector, C )) : document.detachEvent && (document.detachEvent( "onload", this.f.loadTimeCollector ), document.detachEvent( "onmousemove", this.f.mouseCollector ), document.detachEvent( "keypress",
        this.f.keyboardCollector )), this.K = C);
}, addEventListener: function( a, b ) {
    this.P[a][this.la++] = b;
}, removeEventListener: function( a, b ) {
    var c, d, e = this.P[a], f = [];
    for( d in e ) {
        e.hasOwnProperty( d ) && e[d] === b && f.push( d );
    }
    for( c = 0; c < f.length; c++ ) {
        d = f[c], delete e[d];
    }
}, sa: function() {
    Q( 1 );
}, va: function( a ) {
    var b, c;
    try {
        b = a.x || a.clientX || a.offsetX || 0, c = a.y || a.clientY || a.offsetY || 0;
    } catch( d ) {
        c = b = 0;
    }
    0 != b && 0 != c && sjcl.random.addEntropy( [b, c], 2, "mouse" );
    Q( 0 );
}, xa: function( a ) {
    a = a.touches[0] || a.changedTouches[0];
    sjcl.random.addEntropy( [a.pageX ||
                             a.clientX, a.pageY || a.clientY], 1, "touch" );
    Q( 0 );
}, ua: function() {
    Q( 2 );
}, ka: function( a ) {
    a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z;
    if( window.orientation ) {
        var b = window.orientation;
        "number" === typeof b && sjcl.random.addEntropy( b, 1, "accelerometer" );
    }
    a && sjcl.random.addEntropy( a, 2, "accelerometer" );
    Q( 0 );
}};
function ea( a, b ) {
    var c, d = sjcl.random.P[a], e = [];
    for( c in d ) {
        d.hasOwnProperty( c ) && e.push( d[c] );
    }
    for( c = 0; c < e.length; c++ ) {
        e[c]( b );
    }
}
function Q( a ) {
    "undefined" !== typeof window && window.performance && "function" === typeof window.performance.now ? sjcl.random.addEntropy( window.performance.now(), a, "loadtime" ) : sjcl.random.addEntropy( (new Date).valueOf(), a, "loadtime" );
}
function ca( a ) {
    a.d = da( a ).concat( da( a ) );
    a.Q = new sjcl.cipher.aes( a.d );
}
function da( a ) {
    for( var b = 0; 4 > b && !(a.q[b] = a.q[b] + 1 | 0, a.q[b]); b++ ) {
        
    }
    return a.Q.encrypt( a.q );
}
function D( a, b ) {
    return function() {
        b.apply( a, arguments );
    };
}
sjcl.random = new sjcl.prng( 6 );
a:try {
    var R, fa, W, ga;
    if( ga = "undefined" !== typeof module ) {
        var la;
        if( la = module.exports ) {
            var ma;
            try {
                ma = require( "crypto" );
            } catch( pa ) {
                ma = null;
            }
            la = (fa = ma) && fa.randomBytes;
        }
        ga = la;
    }
    if( ga ) {
        R = fa.randomBytes( 128 ), R = new Uint32Array( (new Uint8Array( R )).buffer ), sjcl.random.addEntropy( R, 1024, "crypto['randomBytes']" );
    } else if( "undefined" !== typeof window && "undefined" !== typeof Uint32Array ) {
        W = new Uint32Array( 32 );
        if( window.crypto && window.crypto.getRandomValues ) {
            window.crypto.getRandomValues( W );
        } else if( window.msCrypto && window.msCrypto.getRandomValues ) {
            window.msCrypto.getRandomValues( W );
        }
        else {
            break a;
        }
        sjcl.random.addEntropy( W, 1024, "crypto['getRandomValues']" );
    }
} catch( qa ) {
    "undefined" !== typeof window && window.console && (console.log( "There was an error collecting entropy from the browser:" ), console.log( qa ));
}
sjcl.json = {defaults: {v: 1, iter: 1E3, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes"}, oa: function( a, b, c, d ) {
    c = c || {};
    d = d || {};
    var e = sjcl.json, f = e.p( {iv: sjcl.random.randomWords( 4, 0 )}, e.defaults ), g;
    e.p( f, c );
    c = f.adata;
    "string" === typeof f.salt && (f.salt = sjcl.codec.base64.toBits( f.salt ));
    "string" === typeof f.iv && (f.iv = sjcl.codec.base64.toBits( f.iv ));
    (!sjcl.mode[f.mode] || !sjcl.cipher[f.cipher] || "string" === typeof a && 100 >= f.iter || 64 !== f.ts && 96 !== f.ts && 128 !== f.ts || 128 !== f.ks && 192 !== f.ks && 0x100 !== f.ks || 2 > f.iv.length ||
     4 < f.iv.length) && p( new sjcl.exception.invalid( "json encrypt: invalid parameters" ) );
    "string" === typeof a ? (g = sjcl.misc.cachedPbkdf2( a, f ), a = g.key.slice( 0, f.ks / 32 ), f.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.publicKey && (g = a.kem(), f.kemtag = g.tag, a = g.key.slice( 0, f.ks / 32 ));
    "string" === typeof b && (b = sjcl.codec.utf8String.toBits( b ));
    "string" === typeof c && (f.adata = c = sjcl.codec.utf8String.toBits( c ));
    g = new sjcl.cipher[f.cipher]( a );
    e.p( d, f );
    d.key = a;
    f.ct = sjcl.mode[f.mode].encrypt( g, b, f.iv, c, f.ts );
    return f;
},
    encrypt: function( a, b, c, d ) {
        var e = sjcl.json, f = e.oa(...arguments);
        return e.encode( f );
    }, na: function( a, b, c, d ) {
        c = c || {};
        d = d || {};
        var e = sjcl.json;
        b = e.p( e.p( e.p( {}, e.defaults ), b ), c, v );
        var f, g;
        f = b.adata;
        "string" === typeof b.salt && (b.salt = sjcl.codec.base64.toBits( b.salt ));
        "string" === typeof b.iv && (b.iv = sjcl.codec.base64.toBits( b.iv ));
        (!sjcl.mode[b.mode] || !sjcl.cipher[b.cipher] || "string" === typeof a && 100 >= b.iter || 64 !== b.ts && 96 !== b.ts && 128 !== b.ts || 128 !== b.ks && 192 !== b.ks && 0x100 !== b.ks || !b.iv || 2 > b.iv.length || 4 < b.iv.length) &&
        p( new sjcl.exception.invalid( "json decrypt: invalid parameters" ) );
        "string" === typeof a ? (g = sjcl.misc.cachedPbkdf2( a, b ), a = g.key.slice( 0, b.ks / 32 ), b.salt = g.salt) : sjcl.ecc && a instanceof sjcl.ecc.elGamal.secretKey && (a = a.unkem( sjcl.codec.base64.toBits( b.kemtag ) ).slice( 0, b.ks / 32 ));
        "string" === typeof f && (f = sjcl.codec.utf8String.toBits( f ));
        g = new sjcl.cipher[b.cipher]( a );
        f = sjcl.mode[b.mode].decrypt( g, b.ct, b.iv, f, b.ts );
        e.p( d, b );
        d.key = a;
        return 1 === c.raw ? f : sjcl.codec.utf8String.fromBits( f );
    }, decrypt: function( a, b, c, d ) {
        var e = sjcl.json;
        return e.na( a, e.decode( b ), c, d );
    }, encode: function( a ) {
        var b, c = "{", d = "";
        for( b in a ) {
            if( a.hasOwnProperty( b ) ) {
                switch( b.match( /^[a-z0-9]+$/i ) || p( new sjcl.exception.invalid( "json encode: invalid property name" ) ), c += `${d  }"${  b  }":`, d = ",", typeof a[b] ) {
                    case "number":
                    case "boolean":
                        c += a[b];
                        break;
                    case "string":
                        c += `"${  escape( a[b] )  }"`;
                        break;
                    case "object":
                        c += `"${  sjcl.codec.base64.fromBits( a[b], 0 )  }"`;
                        break;
                    default:
                        p( new sjcl.exception.bug( "json encode: unsupported type" ) );
                }
            }
        }
        return `${c  }}`;
    }, decode: function( a ) {
        a =
        a.replace( /\s/g, "" );
        a.match( /^\{.*\}$/ ) || p( new sjcl.exception.invalid( "json decode: this isn't json!" ) );
        a = a.replace( /^\{|\}$/g, "" ).split( /,/ );
        var b = {}, c, d;
        for( c = 0; c < a.length; c++ ) {
            (d = a[c].match( /^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i )) || p( new sjcl.exception.invalid( "json decode: this isn't json!" ) ), d[3] ? b[d[2]] = parseInt( d[3], 10 ) : d[4] ? b[d[2]] = d[2].match( /^(ct|adata|salt|iv)$/ ) ? sjcl.codec.base64.toBits( d[4] ) : unescape( d[4] ) : d[5] && (b[d[2]] = "true" ===
                                                                                                                                                                                                                                                                                                                                                                              d[5]);
        }
        return b;
    }, p: function( a, b, c ) {
        a === r && (a = {});
        if( b === r ) {
            return a;
        }
        for( var d in b ) {
            b.hasOwnProperty( d ) && (c && (a[d] !== r && a[d] !== b[d]) && p( new sjcl.exception.invalid( "required parameter overridden" ) ), a[d] = b[d]);
        }
        return a;
    }, za: function( a, b ) {
        var c = {}, d;
        for( d in a ) {
            a.hasOwnProperty( d ) && a[d] !== b[d] && (c[d] = a[d]);
        }
        return c;
    }, ya: function( a, b ) {
        var c = {}, d;
        for( d = 0; d < b.length; d++ ) {
            a[b[d]] !== r && (c[b[d]] = a[b[d]]);
        }
        return c;
    }};
sjcl.encrypt = sjcl.json.encrypt;
sjcl.decrypt = sjcl.json.decrypt;
sjcl.misc.wa = {};
sjcl.misc.cachedPbkdf2 = function( a, b ) {
    var c = sjcl.misc.wa, d;
    b = b || {};
    d = b.iter || 1E3;
    c = c[a] = c[a] || {};
    d = c[d] = c[d] || {firstSalt: b.salt && b.salt.length ? b.salt.slice( 0 ) : sjcl.random.randomWords( 2, 0 )};
    c = b.salt === r ? d.firstSalt : b.salt;
    d[c] = d[c] || sjcl.misc.pbkdf2( a, c, b.iter );
    return{key: d[c].slice( 0 ), salt: c.slice( 0 )};
};
sjcl.bn = function( a ) {
    this.initWith( a );
};
sjcl.bn.prototype = {radix: 24, maxMul: 8, i: sjcl.bn, copy: function() {
    return new this.i( this );
}, initWith: function( a ) {
    var b = 0, c;
    switch( typeof a ) {
        case "object":
            this.limbs = a.limbs.slice( 0 );
            break;
        case "number":
            this.limbs = [a];
            this.normalize();
            break;
        case "string":
            a = a.replace( /^0x/, "" );
            this.limbs = [];
            c = this.radix / 4;
            for( b = 0; b < a.length; b += c ) {
                this.limbs.push( parseInt( a.substring( Math.max( a.length - b - c, 0 ), a.length - b ), 16 ) );
            }
            break;
        default:
            this.limbs = [0];
    }
    return this;
}, equals: function( a ) {
    "number" === typeof a && (a = new this.i( a ));
    var b = 0, c;
    this.fullReduce();
    a.fullReduce();
    for( c = 0; c < this.limbs.length || c < a.limbs.length; c++ ) {
        b |= this.getLimb( c ) ^ a.getLimb( c );
    }
    return 0 === b;
}, getLimb: function( a ) {
    return a >= this.limbs.length ? 0 : this.limbs[a];
}, greaterEquals: function( a ) {
    "number" === typeof a && (a = new this.i( a ));
    var b = 0, c = 0, d, e, f;
    for( d = Math.max( this.limbs.length, a.limbs.length ) - 1; 0 <= d; d-- ) {
        e = this.getLimb( d ), f = a.getLimb( d ), c |= f - e & ~b, b |= e - f & ~c;
    }
    return(c | ~b) >>> 31;
}, toString: function() {
    this.fullReduce();
    var a = "", b, c, d = this.limbs;
    for( b = 0; b < this.limbs.length; b++ ) {
        for( c =
             d[b].toString( 16 ); b < this.limbs.length - 1 && 6 > c.length; ) {
            c = `0${  c}`;
        }
        a = c + a;
    }
    return`0x${  a}`;
}, addM: function( a ) {
    "object" !== typeof a && (a = new this.i( a ));
    var b = this.limbs, c = a.limbs;
    for( a = b.length; a < c.length; a++ ) {
        b[a] = 0;
    }
    for( a = 0; a < c.length; a++ ) {
        b[a] += c[a];
    }
    return this;
}, doubleM: function() {
    var a, b = 0, c, d = this.radix, e = this.radixMask, f = this.limbs;
    for( a = 0; a < f.length; a++ ) {
        c = f[a], c = c + c + b, f[a] = c & e, b = c >> d;
    }
    b && f.push( b );
    return this;
}, halveM: function() {
    var a, b = 0, c, d = this.radix, e = this.limbs;
    for( a = e.length - 1; 0 <= a; a-- ) {
        c = e[a], e[a] = c + b >>
                         1, b = (c & 1) << d;
    }
    e[e.length - 1] || e.pop();
    return this;
}, subM: function( a ) {
    "object" !== typeof a && (a = new this.i( a ));
    var b = this.limbs, c = a.limbs;
    for( a = b.length; a < c.length; a++ ) {
        b[a] = 0;
    }
    for( a = 0; a < c.length; a++ ) {
        b[a] -= c[a];
    }
    return this;
}, mod: function( a ) {
    var b = !this.greaterEquals( new sjcl.bn( 0 ) );
    a = (new sjcl.bn( a )).normalize();
    var c = (new sjcl.bn( this )).normalize(), d = 0;
    for( b && (c = (new sjcl.bn( 0 )).subM( c ).normalize()); c.greaterEquals( a ); d++ ) {
        a.doubleM();
    }
    for( b && (c = a.sub( c ).normalize()); 0 < d; d-- ) {
        a.halveM(), c.greaterEquals( a ) &&
                    c.subM( a ).normalize();
    }
    return c.trim();
}, inverseMod: function( a ) {
    var b = new sjcl.bn( 1 ), c = new sjcl.bn( 0 ), d = new sjcl.bn( this ), e = new sjcl.bn( a ), f, g = 1;
    a.limbs[0] & 1 || p( new sjcl.exception.invalid( "inverseMod: p must be odd" ) );
    do {
        d.limbs[0] & 1 && (d.greaterEquals( e ) || (f = d, d = e, e = f, f = b, b = c, c = f), d.subM( e ), d.normalize(), b.greaterEquals( c ) || b.addM( a ), b.subM( c ));
        d.halveM();
        b.limbs[0] & 1 && b.addM( a );
        b.normalize();
        b.halveM();
        for( f = g = 0; f < d.limbs.length; f++ ) {
            g |= d.limbs[f];
        }
    } while( g );
    e.equals( 1 ) || p( new sjcl.exception.invalid( "inverseMod: p and x must be relatively prime" ) );
    return c;
}, add: function( a ) {
    return this.copy().addM( a );
}, sub: function( a ) {
    return this.copy().subM( a );
}, mul: function( a ) {
    "number" === typeof a && (a = new this.i( a ));
    var b, c = this.limbs, d = a.limbs, e = c.length, f = d.length, g = new this.i, h = g.limbs, k, l = this.maxMul;
    for( b = 0; b < this.limbs.length + a.limbs.length + 1; b++ ) {
        h[b] = 0;
    }
    for( b = 0; b < e; b++ ) {
        k = c[b];
        for( a = 0; a < f; a++ ) {
            h[b + a] += k * d[a];
        }
        --l || (l = this.maxMul, g.cnormalize());
    }
    return g.cnormalize().reduce();
}, square: function() {
    return this.mul( this );
}, power: function( a ) {
    "number" === typeof a ?
        a = [a] : a.limbs !== r && (a = a.normalize().limbs);
    var b, c, d = new this.i( 1 ), e = this;
    for( b = 0; b < a.length; b++ ) {
        for( c = 0; c < this.radix; c++ ) {
            a[b] & 1 << c && (d = d.mul( e )), e = e.square();
        }
    }
    return d;
}, mulmod: function( a, b ) {
    return this.mod( b ).mul( a.mod( b ) ).mod( b );
}, powermod: function( a, b ) {
    for( var c = new sjcl.bn( 1 ), d = new sjcl.bn( this ), e = new sjcl.bn( a ); ; ) {
        e.limbs[0] & 1 && (c = c.mulmod( d, b ));
        e.halveM();
        if( e.equals( 0 ) ) {
            break;
        }
        d = d.mulmod( d, b );
    }
    return c.normalize().reduce();
}, trim: function() {
    var a = this.limbs, b;
    do {
        b = a.pop();
    } while( a.length && 0 === b );
    a.push( b );
    return this;
}, reduce: function() {
    return this;
}, fullReduce: function() {
    return this.normalize();
}, normalize: function() {
    var a = 0, b, c = this.placeVal, d = this.ipv, e, f = this.limbs, g = f.length, h = this.radixMask;
    for( b = 0; b < g || 0 !== a && -1 !== a; b++ ) {
        a = (f[b] || 0) + a, e = f[b] = a & h, a = (a - e) * d;
    }
    -1 === a && (f[b - 1] -= c);
    return this;
}, cnormalize: function() {
    var a = 0, b, c = this.ipv, d, e = this.limbs, f = e.length, g = this.radixMask;
    for( b = 0; b < f - 1; b++ ) {
        a = e[b] + a, d = e[b] = a & g, a = (a - d) * c;
    }
    e[b] += a;
    return this;
}, toBits: function( a ) {
    this.fullReduce();
    a = a || this.exponent ||
        this.bitLength();
    var b = Math.floor( (a - 1) / 24 ), c = sjcl.bitArray, d = [c.partial( (a + 7 & -8) % this.radix || this.radix, this.getLimb( b ) )];
    for( b--; 0 <= b; b-- ) {
        d = c.concat( d, [c.partial( Math.min( this.radix, a ), this.getLimb( b ) )] ), a -= this.radix;
    }
    return d;
}, bitLength: function() {
    this.fullReduce();
    for( var a = this.radix * (this.limbs.length - 1), b = this.limbs[this.limbs.length - 1]; b; b >>>= 1 ) {
        a++;
    }
    return a + 7 & -8;
}};
sjcl.bn.fromBits = function( a ) {
    var b = new this, c = [], d = sjcl.bitArray, e = this.prototype, f = Math.min( this.bitLength || 0x100000000, d.bitLength( a ) ), g = f % e.radix || e.radix;
    for( c[0] = d.extract( a, 0, g ); g < f; g += e.radix ) {
        c.unshift( d.extract( a, g, e.radix ) );
    }
    b.limbs = c;
    return b;
};
sjcl.bn.prototype.ipv = 1 / (sjcl.bn.prototype.placeVal = Math.pow( 2, sjcl.bn.prototype.radix ));
sjcl.bn.prototype.radixMask = (1 << sjcl.bn.prototype.radix) - 1;
sjcl.bn.pseudoMersennePrime = function( a, b ) {
    function c( a ) {
        this.initWith( a );
    }

    var d = c.prototype = new sjcl.bn, e, f;
    e = d.modOffset = Math.ceil( f = a / d.radix );
    d.exponent = a;
    d.offset = [];
    d.factor = [];
    d.minOffset = e;
    d.fullMask = 0;
    d.fullOffset = [];
    d.fullFactor = [];
    d.modulus = c.modulus = new sjcl.bn( Math.pow( 2, a ) );
    d.fullMask = 0 | -Math.pow( 2, a % d.radix );
    for( e = 0; e < b.length; e++ ) {
        d.offset[e] = Math.floor( b[e][0] / d.radix - f ), d.fullOffset[e] = Math.ceil( b[e][0] / d.radix - f ), d.factor[e] = b[e][1] * Math.pow( 0.5, a - b[e][0] + d.offset[e] * d.radix ), d.fullFactor[e] =
                                                                                                                                                                                               b[e][1] * Math.pow( 0.5, a - b[e][0] + d.fullOffset[e] * d.radix ), d.modulus.addM( new sjcl.bn( Math.pow( 2, b[e][0] ) * b[e][1] ) ), d.minOffset = Math.min( d.minOffset, -d.offset[e] );
    }
    d.i = c;
    d.modulus.cnormalize();
    d.reduce = function() {
        var a, b, c, d = this.modOffset, e = this.limbs, f = this.offset, q = this.offset.length, t = this.factor, s;
        for( a = this.minOffset; e.length > d; ) {
            c = e.pop();
            s = e.length;
            for( b = 0; b < q; b++ ) {
                e[s + f[b]] -= t[b] * c;
            }
            a--;
            a || (e.push( 0 ), this.cnormalize(), a = this.minOffset);
        }
        this.cnormalize();
        return this;
    };
    d.fa = -1 === d.fullMask ? d.reduce :
        function() {
            var a = this.limbs, b = a.length - 1, c, d;
            this.reduce();
            if( b === this.modOffset - 1 ) {
                d = a[b] & this.fullMask;
                a[b] -= d;
                for( c = 0; c < this.fullOffset.length; c++ ) {
                    a[b + this.fullOffset[c]] -= this.fullFactor[c] * d;
                }
                this.normalize();
            }
        };
    d.fullReduce = function() {
        var a, b;
        this.fa();
        this.addM( this.modulus );
        this.addM( this.modulus );
        this.normalize();
        this.fa();
        for( b = this.limbs.length; b < this.modOffset; b++ ) {
            this.limbs[b] = 0;
        }
        a = this.greaterEquals( this.modulus );
        for( b = 0; b < this.limbs.length; b++ ) {
            this.limbs[b] -= this.modulus.limbs[b] * a;
        }
        this.cnormalize();
        return this;
    };
    d.inverse = function() {
        return this.power( this.modulus.sub( 2 ) );
    };
    c.fromBits = sjcl.bn.fromBits;
    return c;
};
var X = sjcl.bn.pseudoMersennePrime;
sjcl.bn.prime = {p127: X( 127, [
    [0, -1]
] ), p25519: X( 255, [
    [0, -19]
] ), p192k: X( 192, [
    [32, -1],
    [12, -1],
    [8, -1],
    [7, -1],
    [6, -1],
    [3, -1],
    [0, -1]
] ), p224k: X( 224, [
    [32, -1],
    [12, -1],
    [11, -1],
    [9, -1],
    [7, -1],
    [4, -1],
    [1, -1],
    [0, -1]
] ), p256k: X( 0x100, [
    [32, -1],
    [9, -1],
    [8, -1],
    [7, -1],
    [6, -1],
    [4, -1],
    [0, -1]
] ), p192: X( 192, [
    [0, -1],
    [64, -1]
] ), p224: X( 224, [
    [0, 1],
    [96, -1]
] ), p256: X( 0x100, [
    [0, -1],
    [96, 1],
    [192, 1],
    [224, -1]
] ), p384: X( 384, [
    [0, -1],
    [32, 1],
    [96, -1],
    [128, -1]
] ), p521: X( 521, [
    [0, -1]
] )};
sjcl.bn.random = function( a, b ) {
    "object" !== typeof a && (a = new sjcl.bn( a ));
    for( var c, d, e = a.limbs.length, f = a.limbs[e - 1] + 1, g = new sjcl.bn; ; ) {
        do {
            c = sjcl.random.randomWords( e, b ), 0 > c[e - 1] && (c[e - 1] += 0x100000000);
        } while( Math.floor( c[e - 1] / f ) === Math.floor( 0x100000000 / f ) );
        c[e - 1] %= f;
        for( d = 0; d < e - 1; d++ ) {
            c[d] &= a.radixMask;
        }
        g.limbs = c;
        if( !g.greaterEquals( a ) ) {
            return g;
        }
    }
};
sjcl.ecc = {};
sjcl.ecc.point = function( a, b, c ) {
    b === r ? this.isIdentity = v : (b instanceof sjcl.bn && (b = new a.field( b )), c instanceof sjcl.bn && (c = new a.field( c )), this.x = b, this.y = c, this.isIdentity = C);
    this.curve = a;
};
sjcl.ecc.point.prototype = {toJac: function() {
    return new sjcl.ecc.pointJac( this.curve, this.x, this.y, new this.curve.field( 1 ) );
}, mult: function( a ) {
    return this.toJac().mult( a, this ).toAffine();
}, mult2: function( a, b, c ) {
    return this.toJac().mult2( a, this, b, c ).toAffine();
}, multiples: function() {
    var a, b, c;
    if( this.ca === r ) {
        c = this.toJac().doubl();
        a = this.ca = [new sjcl.ecc.point( this.curve ), this, c.toAffine()];
        for( b = 3; 16 > b; b++ ) {
            c = c.add( this ), a.push( c.toAffine() );
        }
    }
    return this.ca;
}, negate: function() {
    var a = (new this.curve.field( 0 )).sub( this.y ).normalize().reduce();
    return new sjcl.ecc.point( this.curve, this.x, a );
}, isValid: function() {
    return this.y.square().equals( this.curve.b.add( this.x.mul( this.curve.a.add( this.x.square() ) ) ) );
}, toBits: function() {
    return sjcl.bitArray.concat( this.x.toBits(), this.y.toBits() );
}};
sjcl.ecc.pointJac = function( a, b, c, d ) {
    b === r ? this.isIdentity = v : (this.x = b, this.y = c, this.z = d, this.isIdentity = C);
    this.curve = a;
};
sjcl.ecc.pointJac.prototype = {add: function( a ) {
    var b, c, d, e;
    this.curve !== a.curve && p( "sjcl['ecc']['add'](): Points must be on the same curve to add them!" );
    if( this.isIdentity ) {
        return a.toJac();
    }
    if( a.isIdentity ) {
        return this;
    }
    b = this.z.square();
    c = a.x.mul( b ).subM( this.x );
    if( c.equals( 0 ) ) {
        return this.y.equals( a.y.mul( b.mul( this.z ) ) ) ? this.doubl() : new sjcl.ecc.pointJac( this.curve );
    }
    b = a.y.mul( b.mul( this.z ) ).subM( this.y );
    d = c.square();
    a = b.square();
    e = c.square().mul( c ).addM( this.x.add( this.x ).mul( d ) );
    a = a.subM( e );
    b = this.x.mul( d ).subM( a ).mul( b );
    d = this.y.mul( c.square().mul( c ) );
    b = b.subM( d );
    c = this.z.mul( c );
    return new sjcl.ecc.pointJac( this.curve, a, b, c );
}, doubl: function() {
    if( this.isIdentity ) {
        return this;
    }
    var a = this.y.square(), b = a.mul( this.x.mul( 4 ) ), c = a.square().mul( 8 ), a = this.z.square(), d = this.curve.a.toString() == (new sjcl.bn( -3 )).toString() ? this.x.sub( a ).mul( 3 ).mul( this.x.add( a ) ) : this.x.square().mul( 3 ).add( a.square().mul( this.curve.a ) ), a = d.square().subM( b ).subM( b ), b = b.sub( a ).mul( d ).subM( c ), c = this.y.add( this.y ).mul( this.z );
    return new sjcl.ecc.pointJac( this.curve,
        a, b, c );
}, toAffine: function() {
    if( this.isIdentity || this.z.equals( 0 ) ) {
        return new sjcl.ecc.point( this.curve );
    }
    var a = this.z.inverse(), b = a.square();
    return new sjcl.ecc.point( this.curve, this.x.mul( b ).fullReduce(), this.y.mul( b.mul( a ) ).fullReduce() );
}, mult: function( a, b ) {
    "number" === typeof a ? a = [a] : a.limbs !== r && (a = a.normalize().limbs);
    var c, d, e = (new sjcl.ecc.point( this.curve )).toJac(), f = b.multiples();
    for( c = a.length - 1; 0 <= c; c-- ) {
        for( d = sjcl.bn.prototype.radix - 4; 0 <= d; d -= 4 ) {
            e = e.doubl().doubl().doubl().doubl().add( f[a[c] >>
                                                         d & 15] );
        }
    }
    return e;
}, mult2: function( a, b, c, d ) {
    "number" === typeof a ? a = [a] : a.limbs !== r && (a = a.normalize().limbs);
    "number" === typeof c ? c = [c] : c.limbs !== r && (c = c.normalize().limbs);
    var e, f = (new sjcl.ecc.point( this.curve )).toJac();
    b = b.multiples();
    var g = d.multiples(), h, k;
    for( d = Math.max( a.length, c.length ) - 1; 0 <= d; d-- ) {
        h = a[d] | 0;
        k = c[d] | 0;
        for( e = sjcl.bn.prototype.radix - 4; 0 <= e; e -= 4 ) {
            f = f.doubl().doubl().doubl().doubl().add( b[h >> e & 15] ).add( g[k >> e & 15] );
        }
    }
    return f;
}, negate: function() {
    return this.toAffine().negate().toJac();
}, isValid: function() {
    var a =
        this.z.square(), b = a.square(), a = b.mul( a );
    return this.y.square().equals( this.curve.b.mul( a ).add( this.x.mul( this.curve.a.mul( b ).add( this.x.square() ) ) ) );
}};
sjcl.ecc.curve = function( a, b, c, d, e, f ) {
    this.field = a;
    this.r = new sjcl.bn( b );
    this.a = new a( c );
    this.b = new a( d );
    this.G = new sjcl.ecc.point( this, new a( e ), new a( f ) );
};
sjcl.ecc.curve.prototype.fromBits = function( a ) {
    var b = sjcl.bitArray, c = this.field.prototype.exponent + 7 & -8;
    a = new sjcl.ecc.point( this, this.field.fromBits( b.bitSlice( a, 0, c ) ), this.field.fromBits( b.bitSlice( a, c, 2 * c ) ) );
    a.isValid() || p( new sjcl.exception.corrupt( "not on the curve!" ) );
    return a;
};
sjcl.ecc.curves = {c192: new sjcl.ecc.curve( sjcl.bn.prime.p192, "0xffffffffffffffffffffffff99def836146bc9b1b4d22831", -3, "0x64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1", "0x188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012", "0x07192b95ffc8da78631011ed6b24cdd573f977a11e794811" ), c224: new sjcl.ecc.curve( sjcl.bn.prime.p224, "0xffffffffffffffffffffffffffff16a2e0b8f03e13dd29455c5c2a3d", -3, "0xb4050a850c04b3abf54132565044b0b7d7bfd8ba270b39432355ffb4", "0xb70e0cbd6bb4bf7f321390b94a03c1d356c21122343280d6115c1d21",
    "0xbd376388b5f723fb4c22dfe6cd4375a05a07476444d5819985007e34" ), c256: new sjcl.ecc.curve( sjcl.bn.prime.p256, "0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551", -3, "0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b", "0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296", "0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5" ), c384: new sjcl.ecc.curve( sjcl.bn.prime.p384, "0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973",
    -3, "0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef", "0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7", "0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f" ), k192: new sjcl.ecc.curve( sjcl.bn.prime.p192k, "0xfffffffffffffffffffffffe26f2fc170f69466a74defd8d", 0, 3, "0xdb4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d", "0x9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d" ),
    k224: new sjcl.ecc.curve( sjcl.bn.prime.p224k, "0x010000000000000000000000000001dce8d2ec6184caf0a971769fb1f7", 0, 5, "0xa1455b334df099df30fc28a169a467e9e47075a90f7e650eb6b7a45c", "0x7e089fed7fba344282cafbd6f7e319f7c0b0bd59e2ca4bdb556d61a5" ), k256: new sjcl.ecc.curve( sjcl.bn.prime.p256k, "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 0, 7, "0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8" )};
sjcl.ecc.basicKey = {publicKey: function( a, b ) {
    this.l = a;
    this.s = a.r.bitLength();
    this.I = b instanceof Array ? a.fromBits( b ) : b;
    this.get = function() {
        var a = this.I.toBits(), b = sjcl.bitArray.bitLength( a ), e = sjcl.bitArray.bitSlice( a, 0, b / 2 ), a = sjcl.bitArray.bitSlice( a, b / 2 );
        return{x: e, y: a};
    };
}, secretKey: function( a, b ) {
    this.l = a;
    this.s = a.r.bitLength();
    this.H = b;
    this.get = function() {
        return this.H.toBits();
    };
}};
sjcl.ecc.basicKey.generateKeys = function( a ) {
    return function( b, c, d ) {
        b = b || 0x100;
        "number" === typeof b && (b = sjcl.ecc.curves[`c${  b}`], b === r && p( new sjcl.exception.invalid( "no such curve" ) ));
        d = d || sjcl.bn.random( b.r, c );
        c = b.G.mult( d );
        return{pub: new sjcl.ecc[a].publicKey( b, c ), sec: new sjcl.ecc[a].secretKey( b, d )};
    };
};
sjcl.ecc.elGamal = {generateKeys: sjcl.ecc.basicKey.generateKeys( "elGamal" ), publicKey: function( a, b ) {
    sjcl.ecc.basicKey.publicKey.apply( this, arguments );
}, secretKey: function( a, b ) {
    sjcl.ecc.basicKey.secretKey.apply( this, arguments );
}};
sjcl.ecc.elGamal.publicKey.prototype = {kem: function( a ) {
    a = sjcl.bn.random( this.l.r, a );
    var b = this.l.G.mult( a ).toBits();
    return{key: sjcl.hash.sha256.hash( this.I.mult( a ).toBits() ), tag: b};
}};
sjcl.ecc.elGamal.secretKey.prototype = {unkem: function( a ) {
    return sjcl.hash.sha256.hash( this.l.fromBits( a ).mult( this.H ).toBits() );
}, dh: function( a ) {
    return sjcl.hash.sha256.hash( a.I.mult( this.H ).toBits() );
}, dhJavaEc: function( a ) {
    return a.I.mult( this.H ).x.toBits();
}};
sjcl.ecc.ecdsa = {generateKeys: sjcl.ecc.basicKey.generateKeys( "ecdsa" )};
sjcl.ecc.ecdsa.publicKey = function( a, b ) {
    sjcl.ecc.basicKey.publicKey.apply( this, arguments );
};
sjcl.ecc.ecdsa.publicKey.prototype = {verify: function( a, b, c ) {
    sjcl.bitArray.bitLength( a ) > this.s && (a = sjcl.bitArray.clamp( a, this.s ));
    var d = sjcl.bitArray, e = this.l.r, f = this.s, g = sjcl.bn.fromBits( d.bitSlice( b, 0, f ) ), d = sjcl.bn.fromBits( d.bitSlice( b, f, 2 * f ) ), h = c ? d : d.inverseMod( e ), f = sjcl.bn.fromBits( a ).mul( h ).mod( e ), h = g.mul( h ).mod( e ), f = this.l.G.mult2( f, h, this.I ).x;
    if( g.equals( 0 ) || d.equals( 0 ) || g.greaterEquals( e ) || d.greaterEquals( e ) || !f.equals( g ) ) {
        if( c === r ) {
            return this.verify( a, b, v );
        }
        p( new sjcl.exception.corrupt( "signature didn't check out" ) );
    }
    return v;
}};
sjcl.ecc.ecdsa.secretKey = function( a, b ) {
    sjcl.ecc.basicKey.secretKey.apply( this, arguments );
};
sjcl.ecc.ecdsa.secretKey.prototype = {sign: function( a, b, c, d ) {
    sjcl.bitArray.bitLength( a ) > this.s && (a = sjcl.bitArray.clamp( a, this.s ));
    var e = this.l.r, f = e.bitLength();
    d = d || sjcl.bn.random( e.sub( 1 ), b ).add( 1 );
    b = this.l.G.mult( d ).x.mod( e );
    a = sjcl.bn.fromBits( a ).add( b.mul( this.H ) );
    c = c ? a.inverseMod( e ).mul( d ).mod( e ) : a.mul( d.inverseMod( e ) ).mod( e );
    return sjcl.bitArray.concat( b.toBits( f ), c.toBits( f ) );
}};
sjcl.keyexchange.srp = {makeVerifier: function( a, b, c, d ) {
    a = sjcl.keyexchange.srp.makeX( a, b, c );
    a = sjcl.bn.fromBits( a );
    return d.g.powermod( a, d.N );
}, makeX: function( a, b, c ) {
    a = sjcl.hash.sha1.hash( `${a  }:${  b}` );
    return sjcl.hash.sha1.hash( sjcl.bitArray.concat( c, a ) );
}, knownGroup: function( a ) {
    "string" !== typeof a && (a = a.toString());
    sjcl.keyexchange.srp.Z || sjcl.keyexchange.srp.qa();
    return sjcl.keyexchange.srp.ba[a];
}, Z: C, qa: function() {
    var a, b;
    for( a = 0; a < sjcl.keyexchange.srp.aa.length; a++ ) {
        b = sjcl.keyexchange.srp.aa[a].toString(),
            b = sjcl.keyexchange.srp.ba[b], b.N = new sjcl.bn( b.N ), b.g = new sjcl.bn( b.g );
    }
    sjcl.keyexchange.srp.Z = v;
}, aa: [1024, 1536, 2048], ba: {1024: {N: "EEAF0AB9ADB38DD69C33F80AFA8FC5E86072618775FF3C0B9EA2314C9C256576D674DF7496EA81D3383B4813D692C6E0E0D5D8E250B98BE48E495C1D6089DAD15DC7D7B46154D6B6CE8EF4AD69B15D4982559B297BCF1885C529F566660E57EC68EDBC3C05726CC02FD4CBF4976EAA9AFD5138FE8376435B9FC61D2FC0EB06E3", g: 2}, 1536: {N: "9DEF3CAFB939277AB1F12A8617A47BBBDBA51DF499AC4C80BEEEA9614B19CC4D5F4F5F556E27CBDE51C6A94BE4607A291558903BA0D0F84380B655BB9A22E8DCDF028A7CEC67F0D08134B1C8B97989149B609E0BE3BAB63D47548381DBC5B1FC764E3F4B53DD9DA1158BFD3E2B9C8CF56EDF019539349627DB2FD53D24B7C48665772E437D6C7F8CE442734AF7CCB7AE837C264AE3A9BEB87F8A2FE9B8B5292E5A021FFF5E91479E8CE7A28C2442C6F315180F93499A234DCF76E3FED135F9BB",
    g: 2}, 2048: {N: "AC6BDB41324A9A9BF166DE5E1389582FAF72B6651987EE07FC3192943DB56050A37329CBB4A099ED8193E0757767A13DD52312AB4B03310DCD7F48A9DA04FD50E8083969EDB767B0CF6095179A163AB3661A05FBD5FAAAE82918A9962F0B93B855F97993EC975EEAA80D740ADBF4FF747359D041D5C33EA71D281E446B14773BCA97B43A23FB801676BD207A436C6481F1D2B9078717461A5B9D32E688F87748544523B524B0D57D5EA77A2775D2ECFA032CFBDBF52FB3786160279004E57AE6AF874E7303CE53299CCC041C7BC308D82A5698F3A8D0C38271AE35F8E9DBFBB694B5C803D89F7AE435DE236D525F54759B65E372FCD68EF20FA7111F9E4AFF73",
    g: 2}}};
