import { BaileysEventEmitter } from '../Types'

class LabelStore {
	public labels: Array<{
        name: string
        id: string
        color: number
    }>
	public labelAssociations: Record<string, string[]>

	constructor() {
		this.labels = []
		this.labelAssociations = {}

	};

	public bind(ev: BaileysEventEmitter) {
		ev.on('label.add', (data) => {
			this.labelAdd(data)
		})

		ev.on('label.remove', (data) => {
			this.labelRemove(data)
		})

		ev.on('label-association.add', (data) => {
			this.labelAssociationAdd(data)
		})

		ev.on('label-association.remove', (data) => {
			this.labelAssociationRemove(data)
		})
	}

	public labelAdd({ name, id, color }: { name: string, id: string, color: number }) {
		this.labels.push({ name, id, color })

		// оставил чтобы выводило результат в консоль
		console.log('\n\nlabelAdd', { id, labels: this.labels })
	}

	public labelRemove({ id }: { id: string }) {
		this.labels = this.labels.filter(value => value.id !== id)

		// оставил чтобы выводило результат в консоль
		console.log('\n\nlabelRemove', { id, labels: this.labels })
	}

	public labelAssociationAdd({ labelId, chatId }: { labelId: string, chatId: string }) {
		const array = this.labelAssociations[labelId] || []
		this.labelAssociations = {
			...this.labelAssociations,
			[labelId]: [...array, chatId]
		}
		// оставил чтобы выводило результат в консоль
		console.log('\n\nlabel-association.add', { labelAssociations: this.labelAssociations })

	}

	public labelAssociationRemove({ labelId, chatId }: { labelId: string, chatId: string }) {
		const { [labelId]: array = [], ...labelAssociations } = this.labelAssociations
		if(array.length > 0) {
			const result = array.filter(value => value !== chatId)
			this.labelAssociations = {
				...labelAssociations,
				...result.length > 0 && { [labelId]:result }
			}
		}

		// оставил чтобы выводило результат в консоль
		console.log('\n\nlabel-association.remove', { labelAssociations: this.labelAssociations })

	}

	public getLabels() {
		return this.labels
	}

	public getLabelAssociations() {
		return this.labelAssociations
	}
}

export default new LabelStore()
