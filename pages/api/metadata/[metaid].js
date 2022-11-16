const metadata = [
    {
        "format" : "CHIP-0007",
        "name": "Fighter 1",
        "description": "Reconnaisanse soldier",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "Mobile Carbine Rifle"
            },
            {
                "trait_type": "Armor",
                "value": true
            },
            {
                "trait_type": "Strength",
                "value": 68
            }
        ]
    },
    {
        "format" : "CHIP-0007",
        "name": "Fighter 2",
        "description": "Frontline Commander",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "Intelligent Alien Ripper"
            },
            {
                "trait_type": "Armor",
                "value": false
            },
            {
                "trait_type": "Strength",
                "value": 72
            }
        ]
    },
    {
        "format" : "CHIP-0007",
        "name": "Fighter 3",
        "description": "Raiden Hat",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "Fists"
            },
            {
                "trait_type": "Armor",
                "value": true
            },
            {
                "trait_type": "Strength",
                "value": 90
            }
        ]
    },
    {
        "format" : "CHIP-0007",
        "name": "Fighter 4",
        "description": "Lieutenant, leader",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "Futuristic Blaster"
            },
            {
                "trait_type": "Armor",
                "value": false
            },
            {
                "trait_type": "Strength",
                "value": 83
            }
        ]
    },
    {
        "format" : "CHIP-0007",
        "name": "Fighter 5",
        "description": "Reconnaisanse soldier",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "Electropulsing sword"
            },
            {
                "trait_type": "Armor",
                "value": true
            },
            {
                "trait_type": "Strength",
                "value": 68
            }
        ]
    },
    {
        "format" : "CHIP-0007",
        "name": "Fighter 6",
        "description": "MechaMan, Damage relish",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "fists"
            },
            {
                "trait_type": "Armor",
                "value": true
            },
            {
                "trait_type": "Strength",
                "value": 60
            }
        ]
    },
    {
        "format" : "CHIP-0007",
        "name": "Fighter 7",
        "description": "Captain of Squad 7, Dependable",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "Electropulsing sword"
            },
            {
                "trait_type": "Armor",
                "value": true
            },
            {
                "trait_type": "Strength",
                "value": 83
            }
        ]
    },
    {
        "format" : "CHIP-0007",
        "name": "Fighter 8",
        "description": "Trench Soldier",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "Shred digger"
            },
            {
                "trait_type": "Armor",
                "value": true
            },
            {
                "trait_type": "Strength",
                "value": 50
            }
        ]
    },
    {
        "format" : "CHIP-0007",
        "name": "Fighter 9",
        "description": "god, basically invincible, rank 1, leader of all 10 armies",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "Super Zanpakuto"
            },
            {
                "trait_type": "Armor",
                "value": false
            },
            {
                "trait_type": "Strength",
                "value": 100
            }
        ]
    },
    {
        "format" : "CHIP-0007",
        "name": "Fighter 10",
        "description": "John Wicked",
        "collection": {
            "id": "1",
            "name": "V-belt test"
        },
        "attributes": [
            {
                "trait_type": "Weapon",
                "value": "Rocket fists + dog"
            },
            {
                "trait_type": "Armor",
                "value": true
            },
            {
                "trait_type": "Strength",
                "value": 90
            }
        ]
    }
]

export default function handler(req,res) {
  const metaId = req.query.metaId
  if(metaId) {
    res.status(200).json(metadata[Number(metaId-1)]);
  } else {
    res.status(200).json(metadata)
  }
   
}
